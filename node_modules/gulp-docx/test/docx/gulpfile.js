'use strict';
const Gulp = require('gulp').Gulp;
const gulp = new Gulp();
const docx = require('../../index');
const rename = require('gulp-rename');
const del = require('del');

gulp.task('clean', function(cb) {
  del('build', cb);
});

gulp.task('default', () => {
  return gulp.src(['src/**/*.docx'])
    .pipe(docx())
    .pipe(rename(p => p.extname = '.txt'))
    .pipe(gulp.dest('build'));
});

module.exports = gulp;
