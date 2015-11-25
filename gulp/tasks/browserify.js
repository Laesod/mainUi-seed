'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    g = require('gulp-load-plugins')(),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    handleErrors = require('../util/handleErrors'),
    debowerify = require('debowerify'),
    ngAnnotate = require('browserify-ngannotate');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(sync) {
    var browserSync = sync ? require('browser-sync') : null;
    // global.isProd = true;

    var bundler = browserify({
        entries: config.browserify.entries,
        debug: !global.isProd,
        cache: {},
        packageCache: {},
        fullPaths: true
    }, watchify.args);

    if (!global.isProd) {
        bundler = watchify(bundler);
        bundler.on('update', function() {
            rebundle();
        });
    }

    var transforms = [
        debowerify,
        ngAnnotate,
        'brfs',
        'bulkify'
    ];

    transforms.forEach(function(transform) {
        bundler.transform(transform);
    });

    function rebundle() {
        var stream = bundler.bundle();
        var createSourcemap = !global.isProd && config.browserify.sourcemap;

        // g.util.log('Rebundle...');

        var result = stream.on('error', handleErrors)
            .pipe(source('main.js'))
            .pipe(g.rename(config.browserify.bundleName))
            // .pipe(g.if(createSourcemap, buffer()))
            // .pipe(g.if(createSourcemap, g.sourcemaps.init()))
            .pipe(g.if(global.isProd, g.streamify(g.uglify({
                mangle: false
            }))))
            // .pipe(g.if(createSourcemap, g.sourcemaps.write('./')))
            .pipe(gulp.dest(config.scripts.dest));

        return sync ? result.pipe(g.if(browserSync.active, browserSync.reload({
            stream: true,
            once: true
        }))) : result;
    }

    return rebundle();
}

gulp.task('browserify', function() {
    return buildScript();
});

gulp.task('browserifySync', function() {
    return buildScript(true);
});