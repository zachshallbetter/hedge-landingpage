'use strict';

var fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    errors = require('../gulperrors');

gulp.task('html', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = 'src/**/*.html',
        myDestination = 'dist';

    let myIncludeOptions = {
        prefix: '@@',
        basepath: './dist/',
    };

    let myHtmlMinOptions = {
        collapseWhitespace: true,
    };

    return gulp.src(mySource)
        .pipe(plumber())
        .pipe(fileinclude(myIncludeOptions)).on('error', errors)
        .pipe(gulpif(myProduction, htmlmin(myHtmlMinOptions))).on('error', errors)
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
