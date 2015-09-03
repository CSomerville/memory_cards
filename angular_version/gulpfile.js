var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');

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

gulp.task('templates', function(){
  return gulp.src('assets/angular/templates/**/*.html')
    .pipe(templateCache({standalone: true}))
    .pipe(gulp.dest('assets/angular/templates'))
})

gulp.task('vendor', function(){
  return gulp.src(['assets/bower_components/angular/angular.js',
    'assets/bower_components/angular-route/angular-route.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
})

gulp.task('scripts', function(){
  return gulp.src(['assets/angular/**/*.js'])
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
  gulp.watch('assets/angular/templates/**/*.html', ['templates'])
  gulp.watch('assets/angular/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'vendor', 'scripts', 'templates', 'watch']);