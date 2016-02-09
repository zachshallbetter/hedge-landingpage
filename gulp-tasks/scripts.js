'use strict';

var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    envify = require('envify/custom'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    errors = require('../gulperrors');

gulp.task('scripts', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = '../src/scripts/index.js',
        myDestination = 'dist/scripts';

    let myBundler = browserify({
        basedir: __dirname,
        entries: mySource,
        debug: !myProduction,
        cache: {},
        packageCache: {},
        fullPaths: !myProduction,
    });

    myBundler.transform(envify({
        _: 'purge',
        NODE_ENV: process.env.NODE_ENV,
    }));

    let bundle = () => {
        return myBundler.bundle().on('error', errors)
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gulpif(myProduction, uglify()))
            .pipe(gulp.dest(myDestination))
            .pipe(livereload());
    };

    myBundler.on('update', bundle);

    if (!myProduction) {
        watchify(myBundler);
    }

    return bundle();
});
