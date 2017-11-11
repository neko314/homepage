let gulp = require("gulp");
let concat = require("gulp-concat");

gulp.task("default", () => {
  let srcFiles = [
    "node_modules/normalize.css/normalize.css",
    "stylesheets/index.css"
  ];

  return gulp.src(srcFiles)
    .pipe(concat("homepage.css"))
    .pipe(gulp.dest("./public"));
});
