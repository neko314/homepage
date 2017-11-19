let browserSync = require("browser-sync").create();
let clean       = require("gulp-clean-css");
let concat      = require("gulp-concat");
let data        = require("gulp-data");
let gulp        = require("gulp");
let htmlmin     = require("gulp-htmlmin");
let index       = require("gulp-ejs-index");
let layout      = require("gulp-ejs-layout");
let markdown    = require("gulp-markdown");
let path        = require("path");
let sass        = require("gulp-sass");
let sourcemaps  = require("gulp-sourcemaps");

gulp.task("homepage", () => {
  gulp.src("./contents/index.md")
    .pipe(markdown())
    .pipe(data((file) => {
      return {
        pageTitle: "Naoto Kaneko"
      };
    }))
    .pipe(layout("./layouts/index.ejs"))
    .pipe(layout("./layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public"));
});

gulp.task("posts", () => {
  gulp.src("./contents/posts/*.md")
    .pipe(markdown())
    .pipe(index("./layouts/posts/index.ejs", { path: path }))
    .pipe(data((file) => {
      return {
        pageTitle: "Posts - Naoto Kaneko"
      };
    }))
    .pipe(layout("./layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public/posts"))
});

gulp.task("post", () => {
  gulp.src("./contents/posts/*.md")
    .pipe(markdown())
    .pipe(data((file) => {
      let postTitle = path.basename(file.path, ".html");
      return {
        pageTitle: `${postTitle} - Naoto Kaneko`,
        postTitle: postTitle,
        publishTime: file.stat.mtime.toLocaleString(),
        publishTimeISO8601: file.stat.mtime.toISOString()
      };
    }))
    .pipe(layout("./layouts/posts/post.ejs"))
    .pipe(layout("./layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public/posts"));
});

gulp.task("stylesheets", () => {
  let srcFiles = [
    "./node_modules/ress/ress.css",
    "./stylesheets/base.sass",
    "./stylesheets/large.sass"
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

gulp.task("default", ["homepage", "post", "posts", "stylesheets"]);

gulp.task("server", ["default", "browser-sync"], () => {
  gulp.watch("./contents/index.md", ["homepage"]).on("change", browserSync.reload);
  gulp.watch("./contents/posts/*.md", ["post", "posts"]).on("change", browserSync.reload);
  gulp.watch("./layouts/index.ejs", ["homepage"]).on("change", browserSync.reload);
  gulp.watch("./layouts/posts/post.ejs", ["post"]).on("change", browserSync.reload);
  gulp.watch("./layouts/posts/index.ejs", ["posts"]).on("change", browserSync.reload);
  gulp.watch("./stylesheets/**/*.sass", ["stylesheets"]);
});
