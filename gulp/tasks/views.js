'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    g = require('gulp-load-plugins')();

gulp.task('views', function() {
    return gulp.src(config.views.src)
        .pipe(g.angularTemplatecache('templates.js', {
            standalone: true,
            transformUrl: function(url) {
                var arr = url.split(/[\/\\]/);      
                return 'views/' + arr[arr.length - 1];
            }
        }))
        .pipe(gulp.dest(config.scripts.dest));
});
