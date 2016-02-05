'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('S3', ['lib'], function(cb) {
    global.isProd = false;

    runSequence(['prepareContextParamsS3', 'styles', 'images', 'fonts', 'views', 'prepareIndexHtmlDev', 'browserify'], 'clean', 'lint');
});