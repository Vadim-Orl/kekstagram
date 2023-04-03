const {src, dest} = require("gulp");

//Конфигурация
const path =require("../config/path.js");
const app =require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");





const photos = ()=> {
  return src(path.photos.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "PHOTOS",
        message: error.message
      }))
    }))
    .pipe(newer(path.photos.dest))
    .pipe(gulpif(app.isProd,webp()))
    .pipe(dest(path.photos.dest))
    .pipe(gulpif(app.isProd,src(path.photos.src)))
    .pipe(gulpif(app.isProd,newer(path.photos.dest)))
    .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
    .pipe(gulpif(app.isProd, dest(path.photos.dest)));
};

module.exports = photos;