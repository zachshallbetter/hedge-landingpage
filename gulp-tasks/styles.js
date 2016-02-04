'use strict';

var atImport = require("postcss-import"),
    cssnano = require('gulp-cssnano'),
    cssnext = require('postcss-cssnext'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    postcss = require('gulp-postcss'),
    mixins = require('postcss-mixins'),
    // sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    errors = require('../gulperrors');

gulp.task('styles', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = 'src/styles/screen.css',
        myDestination = 'dist/styles';

    let myProcessors = [
        atImport,
        mixins,
        cssnext({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] }),
    ];

    return gulp.src(mySource)
        .pipe(gulpif(!myProduction, sourcemaps.init()))
        // .pipe(sass()).on('error', errors) // Sass
        .pipe(postcss(myProcessors))
        .pipe(gulpif(myProduction, cssnano())).on('error', errors) // Minify
        .pipe(gulpif(!myProduction, sourcemaps.write())) // Sourcemaps
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
