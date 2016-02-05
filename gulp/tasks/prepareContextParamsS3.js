'use strict';

var gulp = require('gulp');
var replace = require('gulp-batch-replace');

gulp.task('prepareContextParamsS3', function() {
    var replacementMap = [];

    replacementMap.push(["toBeReplacedByContextPrefix", '']);
    replacementMap.push(["toBeReplacedByConfigServicePrefix", 'http://52.24.140.38/']);

    gulp.src(['src/main/resources/public/templates/context-params.js'])
        .pipe(replace(replacementMap))
        .pipe(gulp.dest('src/main/resources/public/app/_global'));
});