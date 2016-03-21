'use strict';

var changed = require('gulp-changed'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    tinypng = require('gulp-tinypng'),
    plumber = require('gulp-plumber');

gulp.task('images', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let myDestination = 'dist/images',
        mySource = ['src/images/*.png'];

    const mySecret = 'vLx9ievsTmflo1rPTDP5B3MCmK8atjw8';

    return gulp.src(mySource)
        .pipe(plumber())
        // .pipe(changed(myDestination)) // Only apply to new files
        .pipe(gulpif(myProduction, tinypng(mySecret))) // Run through tinypng for small filesizes
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
