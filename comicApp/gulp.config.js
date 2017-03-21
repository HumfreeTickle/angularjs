module.exports = function() {
    var app = './app/';
    var root = './';
    var scripts = app + 'scripts/'
    var temp = app + 'tmp/';
    var wiredep = require('wiredep');
    // var bowerFiles = wiredep({ devDependencies: true })['js'];

    var config = {

        /**
         * File Paths
         */
        app: app,
        alljs: [
            './app/**/*.js',
            './*.js'
        ],
        build: './build/',
        css: app + temp + 'styles.css',
        fonts: app + 'fonts/**/*.*',
        htmltemplates: app + '**/*.html',
        index: app + 'index.html',
        images: app + 'images/**/*.*',
        js: [scripts + '**/*.module.js',
            scripts + '**/*.js',
            '!' + scripts + '**/*.spec.js'
        ],
        sass: [
            app + 'styles/**/*.scss'
        ],
        root: root,
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         */
        // bower: {
        //     json: require('./bower.json'),
        //     directory: './bower_components/',
        //     ignorePath: '../..'
        // },

        /**
         * Version Updating
         */

        packages: [
            './package.json',
        ],
    };

    config.getWiredDefaultOptions = function() {
        var options = {
            // bowerJson: config.bower.json,
            // directory: config.bower.directory,
            // ignorePath: config.bower.ignorePath
        };
        return options;
    };



    return config;

};