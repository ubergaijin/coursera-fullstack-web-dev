'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin');

function sassTask() {
    return src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
}

function sassWatch() {
    return watch('./css/*.scss', sassTask);
}

function browserSyncTask() {
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
    ];

    return browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
}

function clean() {
    return del(['./dist']);
}

function copyfonts() {
    return src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(dest('./dist/fonts'));
}

function imageminTask() {
    return src('./img/*.{png,jpg,gif}')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(dest('./dist/img'));
}

function useminTask() {
    return src('./*.html')
        .pipe(flatmap(function (stream, file) {
            return stream.pipe(usemin({
                css: [rev()],
                html: [htmlmin({ collapseWhitespace: true })],
                js: [uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleanCss(), 'concat']
            }))
        }))
        .pipe(dest('./dist'));
}

exports.sass = sassTask;
exports.default = parallel(browserSyncTask, sassWatch);
exports.build = series(clean, parallel(copyfonts, imageminTask, useminTask));
