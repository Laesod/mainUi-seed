'use strict';

module.exports = {

    browserport: 3000,
    uiport: 3001,
    //'serverport'   : 3002,
    serverport: 6031,

    root: 'src/main/resources/public',
    dist: 'src/main/resources/public/build',

    styles: {
        libSrc: [
            'src/main/resources/public/lib/font-awesome/css/font-awesome.css',
            'src/main/resources/public/lib/angular-material/angular-material.css',
            'src/main/resources/public/lib/ng-tags-input/ng-tags-input.min.css' 
        ],
        src: [
            'src/main/resources/public/app/_global/_vars.less',
            'src/main/resources/public/app/_global/_typography.less',
            'src/main/resources/public/app/_global/main.less',
            'src/main/resources/public/app/**/**/*.less',
            'src/main/resources/public/app/**/*.less'
        ],
        dest: 'src/main/resources/public/build/css'
    },

    scripts: {
        src: 'src/main/resources/public/app/**/*.js',
        dest: 'src/main/resources/public/build/js'
    },

    images: {
        src: 'src/main/resources/public/img/**/*',
        dest: 'src/main/resources/public/build/img'
    },

    fonts: {
        src: ['src/main/resources/public/fonts/**/*'],
        dest: 'src/main/resources/public/build/fonts'
    },

    lib: {
        src: [
            'src/main/resources/public/lib/jquery/jquery.min.js',
            'src/main/resources/public/lib/angular/angular.min.js',
            'src/main/resources/public/lib/angular-aria/angular-aria.min.js',
            'src/main/resources/public/lib/angular-animate/angular-animate.min.js',
            'src/main/resources/public/lib/angular-material/angular-material.min.js',
            'src/main/resources/public/lib/angular-ui-router/release/angular-ui-router.min.js',
            'src/main/resources/public/lib/angular-cookies/angular-cookies.min.js',
            'src/main/resources/public/lib/angular-messages/angular-messages.min.js',
            'src/main/resources/public/lib/angular-translate/angular-translate.min.js',
            'src/main/resources/public/lib/ios-dblclick/ios-dblclick.js',
            'src/main/resources/public/lib/ng-file-upload-shim/ng-file-upload-shim.js',
            'src/main/resources/public/lib/ng-file-upload/ng-file-upload.js',
            'src/main/resources/public/lib/angular-file-saver/dist/angular-file-saver.bundle.min.js',
            'src/main/resources/public/lib/ng-tags-input/ng-tags-input.min.js',
            'src/main/resources/public/lib/lodash/dist/lodash.min.js'
        ],
        dest: 'src/main/resources/public/build/js'
    },

    views: {
        index: 'src/main/resources/public/templates/index.html',
        src: [
            'src/main/resources/public/app/**/*.html',
            '!src/main/resources/public/lib/**/*.html'
        ],
    },

    gzip: {
        src: 'src/main/resources/public/build/**/*.{html,xml,json,css,js,js.map}',
        dest: 'src/main/resources/public/build/',
        options: {}
    },

    browserify: {
        entries: ['./src/main/resources/public/app/_global/main.js'],
        bundleName: 'app.js',
        sourcemap: true
    },

    test: {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    },

    tmp: 'src/main/resources/public/.tmp'
};