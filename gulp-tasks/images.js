'use strict';

var changed = require('gulp-changed'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    tinypng = require('gulp-tinypng');

gulp.task('images', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let myDestination = 'dist/images',
        mySource = ['src/images/*.png'];

    const mySecret = 'A-AVymCOwXuxvG1aWrjQL6MzuAkM99TG';

    return gulp.src(mySource)
        // .pipe(changed(myDestination)) // Only apply to new files
        // .pipe(gulpif(myProduction, tinypng(mySecret))) // Run through tinypng for small filesizes
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
