'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('watch', function() {
    gulp.watch(config.scripts.src, ['lint']);
    gulp.watch(config.styles.src,  ['styles']);
    gulp.watch(config.images.src,  ['images']);
    gulp.watch(config.fonts.src,   ['fonts']);
    gulp.watch(config.views.src,   ['views']);
    gulp.watch(config.views.index, ['index']);
});

gulp.task('watchSync', ['browserSync'], function() {
    gulp.watch(config.scripts.src, ['lint']);
    gulp.watch(config.styles.src,  ['stylesSync']);
    gulp.watch(config.images.src,  ['images']);
    gulp.watch(config.fonts.src,   ['fonts']);
    gulp.watch(config.views.src,   ['views']);
    gulp.watch(config.views.index, ['index']);
});