'use strict';

var changed = require('gulp-changed'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gulpIgnore = require('gulp-ignore'),
    livereload = require('gulp-livereload');

gulp.task('copy', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = [
        'src/**/*',
        'src/.htaccess',
        '!src/config.yml',
        '!src/config.example.yml',
        '!src/scripts/index.js',
        '!src/scripts/app/**/*',
        '!src/styles/**/*',
    ];

    let myDestination = 'dist';

    return gulp.src(mySource)
        .pipe(changed(myDestination)) // Only copy changed files
        .pipe(gulp.dest(myDestination))
        .pipe(gulpif(!myProduction, livereload({ silent: true })));
});
