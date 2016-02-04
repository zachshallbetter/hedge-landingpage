'use strict';

var gulp = require('gulp'),
    svgmin = require('gulp-svgmin'),
    svgsprite = require('gulp-svg-sprite'),
    livereload = require('gulp-livereload');

gulp.task('svg', function() {
    let myProduction = process.env.NODE_ENV !== 'development';

    let mySource = './src/images/*.svg',
        myDestination = './dist/images';

    let myOptions = {
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
        .pipe(svgmin({ plugins: [myPlugins] }))
        .pipe(svgsprite(myOptions))
        .pipe(gulp.dest(myDestination))
        .pipe(livereload());
});
