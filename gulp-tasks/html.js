'use strict';

var fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    livereload = require('gulp-livereload'),
    errors = require('../gulperrors');

gulp.task('html', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = 'src/**/*.html',
        myDestination = 'dist';

    let myOptions = {
        collapseWhitespace: true,
    };

    gulp.src(mySource)
        .pipe(fileinclude())
        .pipe(gulpif(myProduction, htmlmin(myOptions)))
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
