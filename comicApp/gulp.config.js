module.exports = function() {
    var src = './src/';
    var app = src + 'app/';
    var root = './';
    var scripts = app + 'scripts/';
    var server = src + 'server/app.js';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({ devDependencies: true })['js'];

    var config = {

        /**
         * File Paths
         */
        app: app,
        build: './build/',
        css: temp + 'styles.css',
        fonts: app + 'fonts/**/*.*',
        htmltemplates: app + '**/*.html',
        index: app + 'index.html',
        images: app + 'images/**/*.*',
        js: [
            scripts + '**/*.module.js',
            scripts + '**/*.js',
            // '!' + scripts + '**/*.spec.js'
        ],
        sass: [
            app + 'styles/**/*.scss'
        ],
        source: src,
        root: root,
        server: server,
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
                module: 'comicApp.core',
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
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /**
         * Version Updating
         */

        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * Node settings
         */
        nodeServer: './src/server/app.js',
        defaultPort: '7203'
    };

    config.getWiredDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };



    return config;

};