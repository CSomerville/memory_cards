var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
  return gulp.src('assets/images/**/*.jpg')
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('build/images/'))
})