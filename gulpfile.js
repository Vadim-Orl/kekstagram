const gulp = require('gulp');
const plumber = require('gulp-plumber');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemap = require('gulp-sourcemap');

let a = 10;
a++;

const style = () => {
  return gulp.src('source/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemap())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('public/css'));
};
