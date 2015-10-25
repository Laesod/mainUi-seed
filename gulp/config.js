'use strict';

module.exports = {

    browserport: 3000,
    uiport: 3001,
    //'serverport'   : 3002,
    serverport: 6031,

    root: 'src/main/webapp',
    dist: 'src/main/webapp/build',

    styles: {
        libSrc: [
            'src/main/webapp/lib/font-awesome/css/font-awesome.css',
            'src/main/webapp/lib/angular-material/angular-material.css',
        ],
        src: [
            'src/main/webapp/app/_global/_vars.less',
            'src/main/webapp/app/_global/_typography.less',
            'src/main/webapp/app/_global/main.less',
            'src/main/webapp/app/**/**/*.less',
            'src/main/webapp/app/**/*.less'
        ],
        dest: 'src/main/webapp/build/css'
    },

    scripts: {
        src: 'src/main/webapp/app/**/*.js',
        dest: 'src/main/webapp/build/js'
    },

    images: {
        src: 'src/main/webapp/img/**/*',
        dest: 'src/main/webapp/build/img'
    },

    fonts: {
        src: ['src/main/webapp/fonts/**/*'],
        dest: 'src/main/webapp/build/fonts'
    },

    lib: {
        src: [
            'src/main/webapp/lib/jquery/jquery.min.js',
            'src/main/webapp/lib/angular/angular.min.js',
            'src/main/webapp/lib/angular-aria/angular-aria.min.js',
            'src/main/webapp/lib/angular-animate/angular-animate.min.js',
            'src/main/webapp/lib/angular-material/angular-material.min.js',
            'src/main/webapp/lib/angular-ui-router/release/angular-ui-router.min.js',
            'src/main/webapp/lib/angular-cookies/angular-cookies.min.js',
            'src/main/webapp/lib/angular-messages/angular-messages.min.js',
        ],
        dest: 'src/main/webapp/build/js'
    },

    views: {
        index: 'src/main/webapp/index.html',
        src: [
            'src/main/webapp/app/**/*.html',
            '!src/main/webapp/lib/**/*.html'
        ],
    },

    gzip: {
        src: 'src/main/webapp/build/**/*.{html,xml,json,css,js,js.map}',
        dest: 'src/main/webapp/build/',
        options: {}
    },

    browserify: {
        entries: ['./src/main/webapp/app/_global/main.js'],
        bundleName: 'app.js',
        sourcemap: true
    },

    test: {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    },

    tmp: 'src/main/webapp/.tmp'
};
