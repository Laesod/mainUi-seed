'use strict';

var gulp = require('gulp');
var replace = require('gulp-batch-replace');

gulp.task('prepareContextParams', function() {
    var replacementMap = [];

    replacementMap.push(["toBeReplacedByContextPrefix", '/mainUi']);
    replacementMap.push(["toBeReplacedByConfigServicePrefix", '']);

    gulp.src(['src/main/resources/public/templates/context-params.js'])
        .pipe(replace(replacementMap))
        .pipe(gulp.dest('src/main/resources/public/app/_global'));
});