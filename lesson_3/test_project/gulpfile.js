var gulp = require('gulp');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
var minify = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('move', function() {
 return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('less', function () {
return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(concatCss('style.css'))
    .pipe(minify())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: './src'
    });

    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);