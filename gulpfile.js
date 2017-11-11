let gulp = require("gulp");
let concat = require("gulp-concat");
let clean = require("gulp-clean-css");

gulp.task("default", () => {
  let srcFiles = [
    "node_modules/normalize.css/normalize.css",
    "stylesheets/index.css"
  ];

  return gulp.src(srcFiles)
    .pipe(concat("homepage.css"))
    .pipe(clean())
    .pipe(gulp.dest("./public"));
});
