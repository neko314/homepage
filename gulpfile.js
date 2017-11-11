let gulp = require("gulp");

gulp.task("default", () => {
  let srcFiles = [
    "node_modules/normalize.css/normalize.css",
    "stylesheets/index.css"
  ];

  return gulp.src(srcFiles)
    .pipe(gulp.dest("./public"));
});
