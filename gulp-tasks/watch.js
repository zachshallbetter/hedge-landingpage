'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');

gulp.task('watch', () => {
    let myProduction = process.env.NODE_ENV !== 'development';

    if (!myProduction) {
        gulp.watch('src/styles/**', ['styles']);
        gulp.watch('src/*.html', ['html']);
        gulp.watch('src/images/*.svg', ['svg']);
        gulp.watch('src/images/*.png', ['images']);

        let mySource = [
            'src/**/*',
            'src/.htaccess',
            '!src/*.html',
            '!src/scripts/**',
            '!src/styles/**',
            '!src/images/*.svg',
            '!src/images/*.png',
        ];

        gulp.watch(mySource, ['copy']);

        livereload.listen();
    }
});
