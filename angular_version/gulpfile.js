var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('images', function(){
  return gulp.src('assets/images/**/*.jpg')
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('build/images/'));
});

gulp.task('styles', function(){
  return gulp.src('assets/less/**/*.less')
    .pipe(less('main.css'))
    .pipe(gulp.dest('build/'))
})

gulp.task('scripts', function(){
  return gulp.src(['assets/bower_components/angular/angular.js',
    'assets/angular/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .on('error', function(err){
      console.log(err.stack);
      this.end();
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function(){
  gulp.watch('assets/less/**/*.less', ['styles']);
  gulp.watch('assets/angular/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);