'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', (callback) => {
    runSequence(
        'clean',
        'svg',
        'images',
        'scripts',
        'styles',
        'html',
        'copy',
        'watch'
    );
});
