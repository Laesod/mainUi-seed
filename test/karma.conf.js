'use strict';

var istanbul = require('browserify-istanbul');
var tascMock = 'test/tasc.mock.js';
var mainJs = 'src/main/public/app/_global/main.js';

var configOptions = {
    basePath: '../',
    frameworks: ['jasmine', 'browserify'],
    preprocessors: {},
    plugins: ['karma-jasmine', 'karma-mocha-reporter', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-browserify', 'karma-coverage', 'karma-junit-reporter'],
    browsers: ['PhantomJS'], // browsers: ['Chrome'], //for debugging
    reporters: ['progress', 'junit', 'coverage'],
    // singleRun: false, //for debugging
    autoWatch: true,

    browserify: {
        debug: true,
        transform: [
            'brfs',
            'bulkify',
            istanbul({
                ignore: ['**/node_modules/**', '**/lib/**', '**/on_config.js', '**/on_run.js']
            })
        ],
        bundleDelay: 300
    },

    // coverageReporter: {
    //     type: 'html',
    //     dir: './coverage/'
    // },
    junitReporter: {
        outputDir: 'test/reports/junit',
        //outputFile: 'testResults.xml',
        suite: ''
    },

    coverageReporter: {
        dir: './test/coverage/',
        reporters: [{
                type: 'text-summary'
            }, {
                type: 'lcov',
                dir: 'test/reports',
                subdir: 'coverage'
            },
            // { type: 'html' },
            // { type: 'json-summary', subdir: '.', file: 'summary.json' },
            // { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
            // { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
            // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
            // { type: 'text', subdir: '.', file: 'text.txt' },
            // { type: 'json', subdir: '.', file: 'coverage.json' },
            // { type: 'clover', subdir: '.', file: 'clover.xml' }
        ]
    },

    proxies: {
        '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    files: [
        'src/main/public/build/js/lib.js',
        'src/main/public/lib/angular-mocks/angular-mocks.js',
        tascMock,
        mainJs,
        'src/main/public/build/js/templates.js',

        // test files
        'src/main/public/app/**/*.spec.js'
        // 'src/main/public/app/**/recipients/*spec.js'
        // 'src/main/public/app/**/global.service.spec.js'
        // 'src/main/public/app/**/document-delivery.controller.spec.js'
        // 'src/main/public/app/**/document-details.controller.spec.js'
        // 'src/main/public/app/**/document-upload.controller.spec.js'
        // 'src/main/public/app/**/acknowledgement.controller.spec.js'
        // 'src/main/public/app/**/documents.service.spec.js'
        // 'src/main/public/app/**/*directive.spec.js'
    ],

    colors: true
};

configOptions.preprocessors[mainJs] = ['browserify'];

module.exports = function(config) {
    config.set(configOptions);
};