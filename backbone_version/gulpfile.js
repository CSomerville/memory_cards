var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('less', function(){
  return gulp.src('./assets/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'))
})

gulp.task('scripts', function(){
  return gulp.src(['./assets/**/memoire_backbone/**/*.js', './assets/**/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch', ['less','scripts'], function(){
  gulp.watch('./assets/**/*.less', ['less'])
  gulp.watch('./assets/**/*.js', ['scripts']);
})