var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({ lazy: true });
var port = process.env.PORT || config.defaultPort;

// -- Gulp Tasks -- //

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
gulp.task('vet', function() {
    log('Analysing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

// -- Compile and Minify -- //

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling SASS ----> CSS');

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '>5%'] }))
        .pipe(gulp.dest(config.temp));
});
gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts ... ');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});
gulp.task('images', ['clean-images'], function() {
    log('Copying and Compressing Images ... ');
    return gulp
        .src(config.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.build + 'images'));
});

// -- Dev/ Build Tasks -- //

gulp.task('serve-build', ['build'], function() {
    serve(false /* isDev*/ );
});
gulp.task('serve-dev', ['inject'], function() {
    serve(true /* isDev*/ );
});

gulp.task('inject', ['styles' /*, 'wiredep', 'templatecache' */ ], function() {
    log('Injecting custom css into html ');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src('.' + config.css)))
        .pipe(gulp.dest(config.app));
});

gulp.task('build', ['optimize', 'images', 'fonts'], function() {
    log('Building Everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp serve-build`'
    };
    del(config.temp);
    log(msg);
    notify(msg);
});

gulp.task('optimize', ['inject', 'test'], function() {
    log('Optimizing the javascript, css, html ... ');
    var lazypipe = require('lazypipe');
    var assets = $.useref({ searchPath: './' });
    var templateCache = config.temp + config.templateCache.file;

    var cssFilter = $.filter('**/*.css', { restore: true });

    var jsLibFilter = $.filter('**/' + config.optimized.lib, { restore: true });
    var jsAppFilter = $.filter('**/' + config.optimized.app, { restore: true });

    var notIndexFilter = $.filter(['**/*', '!**/index.html'], { restore: true });

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(
            gulp.src(templateCache, { read: false }), {
                starttag: '<!-- inject:templates:js -->'
            }))
        // Apply the concat and file replacement with useref
        .pipe(assets, lazypipe().pipe($.sourcemaps.init, { loadMaps: true }))
        // Get the css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        // Get the custom javascript
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate({ add: true }))
        .pipe($.uglify())
        .pipe(jsAppFilter.restore)
        // Get the vendor javascript
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)
        // Take inventory of the file names for future rev numbers
        .pipe(notIndexFilter)
        .pipe($.rev())
        .pipe(notIndexFilter.restore)
        // Replace the file names in the html with rev numbers   
        .pipe($.revReplace())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.build))
        .pipe($.rev.manifest())
        // Build Destination
        .pipe(gulp.dest(config.build));
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});
gulp.task('bump', function() {
    /**
     * Bump the version
     * --type=pre : will bump the prerelease version *.*.*-x
     * --type=patch (or no flag) : will bump the patch version *.*.x
     * --type=minor : will bump the minor version *.x.*
     * --type=major : will bump the major version x.*.*
     * --version=1.2.3 : will bump to specific version 1.2.3
     */
    var msg = 'Bumping version';
    var type = args.type;
    var version = args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' to ' + type;
    }

    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});
gulp.task('wiredep', function() {
    log('Wiring up the bower css js and custom js into html ');

    var options = config.getWiredDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});


// -- Clean Tasks -- //
gulp.task('clean', function() {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig);
});
gulp.task('clean-styles', function() {
    clean(config.temp + '**/*.css');
});
gulp.task('clean-fonts', function() {
    clean(config.build + 'fonts/**/*.*');
});
gulp.task('clean-images', function() {
    clean(config.build + 'images/**/*.*');
});
gulp.task('clean-code', function() {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files);
});

gulp.task('watch', function() {
    gulp.watch([config.sass], ['styles'])
        .on('change', function(event) { changeEvent(event); });
})

//---------------------------------------------------------------------//
function serve(isDev, specRunner) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted ***');
            log('files changed on restart: \r\n' + ev);
            setTimeout(function() {
                browserSync.notify('Reloading now .... ');
                browserSync.reload({ stream: false });
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started ***');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some undetermined reason ***');
        })
        .on('exit', function() {
            '*** nodemon exited cleanly ***';
        });
}

function changeEvent(event) {
    log('*** Change Event Fired ***');
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port: ' + port);

    if (isDev) {
        gulp.watch([config.sass], ['styles'])
            .on('change', function(event) { changeEvent(event); });
    } else {
        gulp.watch([config.sass, config.js, config.htmltemplates], ['optimize', browserSync.reload])
            .on('change', function(event) { changeEvent(event); });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}

function clean(path) {
    log('Cleaning: ' + $.util.colors.yellow.italic(path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.cyan(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.cyan(msg));
    }
}

function startTests(singleRun, done) {
    var child;
    var fork = require('child_process').fork;

    var Karma = require('karma').Server;

    var excludeFiles = [];
    var serverSpecs = config.serverIntegrationSpecs;

    if (args.startServers) {
        log('Starting Server');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork(config.nodeServer);
    } else {
        if (serverSpecs && serverSpecs.length) {
            excludeFiles = serverSpecs;
        }
    }

    var server = new Karma({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    server.start();

    function karmaCompleted(karmaResult) {
        var status = karmaResult === 1 ? 'ERROR' : 'SUCCESS';
        log('Karma completed with: ' + status);
        if (child) {
            log('Shutting down child processes');
            child.kill();
        }
        log('Exit Code: ' + karmaResult);
        done(); // stripped the arguments that gulp complains about
        // process.exit(karmaResult); // tell karma to exit once tests are done

    }
}

function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}