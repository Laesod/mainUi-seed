'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors');

function buildStyles(sync) {
    return gulp.src(config.styles.src)
        .pipe(g.concat('app.css'))
        .pipe(g.less({
            sourceComments: global.isProd ? 'none' : 'map',
            outputStyle: global.isProd ? 'compressed' : 'nested'
            // sourceMap: 'less',
        }))
        .pipe(g.autoprefixer("last 2 versions", "> 1%", "ie 8"))

        .pipe(gulp.dest(config.tmp))
        .on('error', handleErrors)
        .on('end', function() {
            config.styles.libSrc.push(config.tmp + '/app.css');

            var result = gulp.src(config.styles.libSrc)
                .pipe(g.concat('app.css'))
                .pipe(gulp.dest(config.styles.dest))
                .on('error', handleErrors);

            return sync? result.pipe(g.if(browserSync.active, browserSync.reload({ stream: true }))) : result;
        });    
}

gulp.task('styles', function() {
    return buildStyles();
});

gulp.task('stylesSync', function() {
    return buildStyles(true);
});