let gulp = require("gulp");
let ejs = require("gulp-ejs");
let concat = require("gulp-concat");
let clean = require("gulp-clean-css");
let sourcemaps = require("gulp-sourcemaps");
let sass = require("gulp-sass");

gulp.task("pages", () => {
  let layouts = {
    "./layouts/index.ejs": ["../contents/index.ejs"]
  };

  for (let layout in layouts) {
    let contents = layouts[layout]
    for (let content of contents) {
      gulp.src(layout)
        .pipe(ejs({ content: content }, {}, { ext: ".html" }))
        .pipe(gulp.dest("./public"));
    }
  }
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
