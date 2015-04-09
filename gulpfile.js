var browserify = require('browserify');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var reactify = require('reactify');

var onError = function (err) {
    console.log(err);
};

gulp.task('browserify', function(){
    browserify("./src/react/app.jsx")
        .transform(reactify)
        .bundle()
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('sass', function () {
    gulp.src('./src/sass/app.sass')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({ indentedSyntax: true }))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('default', function() {
    gulp.watch('./src/react/**/*.jsx', ['browserify']);
    gulp.watch('./src/sass/**/*.sass', ['sass']);
});