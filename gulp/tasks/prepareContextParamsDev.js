'use strict';

var gulp = require('gulp');
var replace = require('gulp-batch-replace');

gulp.task('prepareContextParamsDev', function() {
    var replacementMap = [];

    replacementMap.push(["toBeReplacedByContextPrefix", '']);
    replacementMap.push(["toBeReplacedByConfigServicePrefix", 'http://localhost:63769/']);

    gulp.src(['src/main/resources/public/templates/context-params.js'])
        .pipe(replace(replacementMap))
        .pipe(gulp.dest('src/main/resources/public/app/_global'));
});