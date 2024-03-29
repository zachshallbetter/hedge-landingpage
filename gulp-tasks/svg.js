'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    svgmin = require('gulp-svgmin'),
    svgsprite = require('gulp-svg-sprite'),
    livereload = require('gulp-livereload'),
    errors = require('../gulperrors');

gulp.task('svg', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = './src/images/*.svg',
        myDestination = './dist/images';

    let myOptions = {
        svg: {
            xmlDeclaration: false,
            rootAttributes: {
                width: 0,
                height: 0,
                style: 'position:absolute',
            },
        },
        mode: {
            symbol: {
                dest: '.',
                sprite: 'spritesheet.svg',
                example: false,
            },
        },
    };

    let myPlugins = [
        { cleanupIDs: false },
    ];

    return gulp.src(mySource)
        .pipe(plumber())
        .pipe(svgmin({ plugins: [myPlugins] })).on('error', errors)
        .pipe(svgsprite(myOptions)).on('error', errors)
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
