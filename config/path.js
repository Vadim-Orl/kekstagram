const pathSrc = "./source";
const pathDest = "./public";

module.exports = {
  root: [pathDest],

  html: {
    src: pathSrc + "/*.html",
    watch: pathSrc + "/*.html",
    dest: pathDest
  },

  css: {
    src: pathSrc + "/css/*.css",
    watch: pathSrc + "/css/**/*.css",
    dest: pathDest + "/css"
  },

  scss: {
    src: pathSrc + "/sass/*.{sass,scss}",
    watch: pathSrc + "/sass/**/*.{sass,scss}",
    dest: pathDest + "/css"
  },

  js: {
    src: pathSrc + "/js/*.js",
    watch: pathSrc + "/js/**/*.js",
    dest: pathDest + "/js"
  },

  img: {
    src: pathSrc + "/img/*.{png,jpg,jpeg,svg}",
    watch: pathSrc + "/img/**/*.{png,jpg,jpeg,svg}",
    dest: pathDest + "/img"
  },

  photos: {
    src: pathSrc + "/photos/*.{png,jpg,jpeg,svg}",
    watch: pathSrc + "/photos/**/*.{png,jpg,jpeg,svg}",
    dest: pathDest + "/photos"
  },

  fonts: {
    src: pathSrc + "/fonts/*.{woff,woff2}",
    watch: pathSrc + "/fonts/**/*.{woff,woff2}",
    dest: pathDest + "/fonts"
  }
};