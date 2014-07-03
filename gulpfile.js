var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		notify = require('gulp-notify');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('jquery.ajaxWizard.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});