'use strict';

var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');

gulp.task('uiGridFonts', function() {

    return gulp.src(config.uiGridFonts.src)
        .pipe(gulp.dest(config.uiGridFonts.dest));
});