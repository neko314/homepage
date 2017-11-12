let gulp = require("gulp");

let clean      = require("gulp-clean-css");
let concat     = require("gulp-concat");
let htmlmin    = require("gulp-htmlmin");
let layout     = require("gulp-ejs-layout");
let markdown   = require("gulp-markdown");
let sass       = require("gulp-sass");
let sourcemaps = require("gulp-sourcemaps");

gulp.task("pages", () => {
  gulp.src("./contents/**/*.md")
    .pipe(markdown())
    .pipe(layout("./layouts/index.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public"));
});

gulp.task("stylesheets", () => {
  let srcFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./stylesheets/index.sass"
  ];

  gulp.src(srcFiles)
    .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(concat("homepage.css"))
      .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"));
});

gulp.task("default", ["pages", "stylesheets"], () => {
  gulp.watch("./contents/**/*.md", ["pages"]);
  gulp.watch("./stylesheets/**/*.sass", ["stylesheets"]);
});
