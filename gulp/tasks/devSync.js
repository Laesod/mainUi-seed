'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('devSync', ['lib'], function(cb) {
    cb = cb || function() {};

    global.isProd = false;

    runSequence(['stylesSync', 'images', 'fonts', 'views', 'index', 'browserifySync'], 'clean', 'watchSync', cb);
});