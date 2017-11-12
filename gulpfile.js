let gulp = require("gulp");
let markdown = require("gulp-markdown");
let layout = require("gulp-ejs-layout");
let concat = require("gulp-concat");
let clean = require("gulp-clean-css");
let sourcemaps = require("gulp-sourcemaps");
let sass = require("gulp-sass");

gulp.task("pages", () => {
  gulp.src("./contents/**/*.md")
    .pipe(markdown())
    .pipe(layout("./layouts/index.ejs"))
    .pipe(gulp.dest("./public"));
});

gulp.task("stylesheets", () => {
  let srcFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./stylesheets/index.css"
  ];

  gulp.src(srcFiles)
    .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(concat("homepage.css"))
      .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"));
});

gulp.task("default", ["pages", "stylesheets"])
