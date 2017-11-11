let gulp = require("gulp");
let concat = require("gulp-concat");
let clean = require("gulp-clean-css");
let sourcemaps = require("gulp-sourcemaps");

gulp.task("default", () => {
  let srcFiles = [
    "node_modules/normalize.css/normalize.css",
    "stylesheets/index.css"
  ];

  return gulp.src(srcFiles)
    .pipe(sourcemaps.init())
      .pipe(concat("homepage.css"))
      .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"));
});
