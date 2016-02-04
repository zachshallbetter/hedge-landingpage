'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', (callback) => {
    runSequence(
        'clean',
        'scripts',
        'styles',
        'images',
        'svg',
        'html',
        'copy',
        'watch'
    );
});
