'use strict';

var cssnano = require('gulp-cssnano'),
    cssnext = require('postcss-cssnext'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    errors = require('../gulperrors');

gulp.task('styles', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = 'src/styles/screen.css',
        myDestination = 'dist/styles';

    let myProcessors = [
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-position'),
        require('postcss-size'),
        require('postcss-easings'),
        cssnext({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] }),
    ];

    return gulp.src(mySource)
        .pipe(plumber())
        .pipe(gulpif(!myProduction, sourcemaps.init()))
        .pipe(postcss(myProcessors)).on('error', errors)
        .pipe(gulpif(myProduction, cssnano())).on('error', errors)
        .pipe(gulpif(!myProduction, sourcemaps.write()))
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
