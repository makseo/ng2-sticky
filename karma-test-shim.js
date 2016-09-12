if (!Object.hasOwnProperty('name')) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            var matches = this.toString().match(/^\s*function\s*(\S*)\s*\(/);
            var name = matches && matches.length > 1 ? matches[1] : "";
            Object.defineProperty(this, 'name', {value: name});
            return name;
        }
    });
}

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
__karma__.loaded = function () { };

System.config({
    baseURL: '/base/',
    defaultJSExtensions: true,
    paths: {
        'npm:': 'node_modules/'
    },
    map: {
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

        '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',

        'rxjs': 'npm:rxjs'
    },
    packages: {
        'app': {
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        }
    }
});

Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
])
.then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.TestBed.initTestEnvironment(
        testingBrowser.BrowserDynamicTestingModule,
        testingBrowser.platformBrowserDynamicTesting()
    );

})
.then(function () {
    return Promise.all(
        Object.keys(window.__karma__.files)
            .filter(onlySpecFiles)
            .map(file2moduleName)
            .map(function (path) {
                return System.import(path).then(function (module) {
                    if (module.hasOwnProperty('main')) {
                        module.main();
                    } else {
                        throw new Error('Module ' + path + ' does not implement main() method.');
                    }
                });
            })
    );
})
.then(function () {
    __karma__.start();
}, function (error) {
    console.error(error.stack || error);
    __karma__.start();
});

function onlySpecFiles(path) {
    var patternMatched = __karma__.config.files ? path.match(new RegExp(__karma__.config.files)) : true;
    return patternMatched && /[\.|_]spec\.js$/.test(path);
}

function file2moduleName(filePath) {
    return filePath.replace(/\\/g, '/').replace(/^\/base\//, '').replace(/\.js$/, '');
}