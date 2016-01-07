'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    version = new Date().getTime();

gulp.task('prepareIndexHtml', function() {
    gulp.src(config.views.index)
        .pipe(g.htmlReplace({
            favicon: {
                tpl: '<link rel="icon" type="image/x-icon" href="%s" />',
                src: '/mainUi/favicon.ico'                
            },             
            css: {
                tpl: '<link type="text/css" rel="stylesheet" href="%s">',
                src: 'mainUi/build/css/app.css?' + version
            },

            js: {
                tpl: '<script src="%s"></script>',
                src: 'mainUi/build/js/app.js?' + version
            },

            jsLib: {
                tpl: '<script src="%s"></script>',
                src: 'mainUi/build/js/lib.js?' + version
            },

            templates: {
                tpl: '<script src="%s"></script>',
                src: 'mainUi/build/js/templates.js?' + version
            }
        }))
        .pipe(gulp.dest(config.root));
});