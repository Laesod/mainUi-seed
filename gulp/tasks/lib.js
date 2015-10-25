'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    handleErrors = require('../util/handleErrors');

gulp.task('lib', function() {
    return gulp.src(config.lib.src)
        .pipe(g.concat('lib.js'))
        .pipe(gulp.dest(config.lib.dest))
        .on('error', handleErrors)
        .on('end', function() {
            // do nothing
        });
});