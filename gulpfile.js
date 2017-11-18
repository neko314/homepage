let browserSync = require("browser-sync").create();
let clean       = require("gulp-clean-css");
let concat      = require("gulp-concat");
let data        = require("gulp-data");
let gulp        = require("gulp");
let htmlmin     = require("gulp-htmlmin");
let layout      = require("gulp-ejs-layout");
let markdown    = require("gulp-markdown");
let path        = require("path");
let sass        = require("gulp-sass");
let sourcemaps  = require("gulp-sourcemaps");

gulp.task("homepage", () => {
  gulp.src("./contents/index.md")
    .pipe(markdown())
    .pipe(layout("./layouts/index.ejs"))
    .pipe(layout("./layouts/base.ejs", { rootPath: "." }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public"));
});

gulp.task("post", () => {
  gulp.src("./contents/posts/*.md")
    .pipe(markdown())
    .pipe(data((file) => {
      return {
        publishTime: file.stat.mtime.toLocaleString(),
        publishTimeISO8601: file.stat.mtime.toISOString(),
        title: path.basename(file.path, ".html")
      };
    }))
    .pipe(layout("./layouts/posts/post.ejs"))
    .pipe(layout("./layouts/base.ejs", { rootPath: ".." }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public/posts"));
});

gulp.task("stylesheets", () => {
  let srcFiles = [
    "./node_modules/ress/ress.css",
    "./stylesheets/index.sass"
  ];

  gulp.src(srcFiles)
    .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(concat("homepage.css"))
      .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  })
});

gulp.task("default", ["homepage", "post", "stylesheets"]);

gulp.task("server", ["default", "browser-sync"], () => {
  gulp.watch("./contents/index.md", ["homepage"]).on("change", browserSync.reload);
  gulp.watch("./contents/posts/*.md", ["post"]).on("change", browserSync.reload);
  gulp.watch("./layouts/index.ejs", ["homepage"]).on("change", browserSync.reload);
  gulp.watch("./layouts/posts/post.ejs", ["post"]).on("change", browserSync.reload);
  gulp.watch("./stylesheets/**/*.sass", ["stylesheets"]);
});
