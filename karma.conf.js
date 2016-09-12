'use strict';

module.exports = function(config) {
    config.set({
        files: [

            // Polyfills
            'node_modules/core-js/client/shim.min.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',

            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',

            // Reflect
            'node_modules/reflect-metadata/Reflect.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            // RxJs
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false, served: true},
            {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false, served: true},

            // Angular
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false, served: true},

            // Source files
            {pattern: 'src/**/*.js', included: false, watched: false, served: true},
            {pattern: 'src/**/*.js.map', included: false, watched: false, served: true},

            // Test files
            {pattern: 'test/**/*.js', included: false, watched: false, served: true},
            {pattern: 'test/**/*.js.map', included: false, watched: false, served: true},

            'karma-test-shim.js'
        ],
        basepath: './',
        frameworks: ['jasmine'],
        reporters: ['spec'],
        browsers: ['Chrome'],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true
    })
}