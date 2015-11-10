'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean', 'lib'], function(cb) {

    cb = cb || function() {};

    global.isProd = true;

    runSequence(['styles', 'images', 'fonts', 'views', 'prepareIndexHtml', 'browserify'], 'clean', 'gzip', cb);

});