'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', (callback) => {
    runSequence(
        'clean',
        'svg',
        'scripts',
        'styles',
        'html',
        'copy',
        'images',
        'watch'
    );
});
