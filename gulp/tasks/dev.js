'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['lib'], function(cb) {
    global.isProd = false;
    // cb = cb || function() {};
    cb = function() {
        console.log('\n');
        console.log('-----------------------------------------------');
        console.log('gulp dev task finished and is in watch mode now');
        console.log('use http://localhost:63769 to access the app');
        console.log('-----------------------------------------------');
        console.log('\n');
    };

    runSequence(['prepareContextParamsDev', 'styles', 'images', 'fonts', 'views', 'prepareIndexHtmlDev', 'browserify'], 'clean', 'lint', 'watch', cb);
});