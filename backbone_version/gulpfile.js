var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var es = require('event-stream');

// gulp.task('less', function(){
//   var vendor = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css');
//   var custom =  gulp.src('./assets/**/*.less')
//     .pipe(less());

//   return es.concat(vendor, custom)
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('./public/css/'))
// })

gulp.task('less', function(cb){
  gulp.src('./assets/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
  cb();
})

gulp.task('css', ['less'], function(){
  return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css', './public/css/less/*.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./public/css/'));
})

gulp.task('scripts', function(){
  return gulp.src(['./assets/**/memoire_backbone/**/*.js', './assets/**/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch', ['css','scripts'], function(){
  gulp.watch('./assets/**/*.less', ['less'])
  gulp.watch('./assets/**/*.js', ['scripts']);
})