'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    flow = require('gulp-flowtype'),
    jasmine = require('gulp-jasmine'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    sloc = require('gulp-sloc');

gulp.task('test', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    if (myProduction) {
        gulp.src('src/scripts/**/*.js')
            .pipe(jshint()) // Check js with linter
            .pipe(jshint.reporter('jshint-stylish')) // Pretty output
            .pipe(flow()) // Check js with Facebook Flow
            .pipe(sloc()); // Show source lines of code (just for fun)

        // gulp.src('project/tests/*.js')
        //     .pipe(jasmine());
    }
});
