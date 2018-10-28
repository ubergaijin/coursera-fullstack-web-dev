'use strict';

var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    gulpBrowserSync = require('browser-sync');


function sass() {
    return gulp.src('./css/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./css'));
}

function sassWatch(cb) {
    gulp.watch('./css/*.scss', sass);
    cb();
}

function browserSync(cb) {
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
    ];

    gulpBrowserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
    cb();
}

exports.sass = sass;
exports.browserSync = browserSync;
exports.default = gulp.parallel(browserSync, sassWatch);
