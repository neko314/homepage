let gulp = require("gulp");

gulp.task("default", () => {
  let srcFiles = ["stylesheets/index.css"];

  return gulp.src(srcFiles)
    .pipe(gulp.dest("./public"));
});
