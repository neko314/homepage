let gulp = require("gulp");
let concat = require("gulp-concat");
let clean = require("gulp-clean-css");
let sourcemaps = require("gulp-sourcemaps");
let sass = require("gulp-sass");

gulp.task("default", () => {
  let srcFiles = [
    "node_modules/normalize.css/normalize.css",
    "stylesheets/index.css"
  ];

  return gulp.src(srcFiles)
    .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(concat("homepage.css"))
      .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"));
});
