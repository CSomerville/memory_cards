var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function(){
  return gulp.src(['./assets/**/memoire_backbone/**/*.js', './assets/**/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch', ['scripts'], function(){
  gulp.watch('./assets/**/*.js', ['scripts']);
})