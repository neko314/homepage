let browserSync = require("browser-sync").create();
let clean       = require("gulp-clean-css");
let concat      = require("gulp-concat");
let data        = require("gulp-data");
let frontMatter = require("gulp-front-matter");
let fs          = require("fs");
let gulp        = require("gulp");
let htmlmin     = require("gulp-htmlmin");
let index       = require("gulp-ejs-index");
let layout      = require("gulp-ejs-layout");
let markdown    = require("gulp-markdown");
let path        = require("path");
let sass        = require("gulp-sass");

gulp.task("homepage", ["stylesheets"], () => {
  let style = fs.readFileSync("./build/style.css", "utf-8");

  gulp.src("./contents/index.md")
    .pipe(markdown())
    .pipe(data((file) => {
      return {
        ogType: "profile",
        pageDescription: "Naoto Kaneko's homepage",
        pageTitle: "Naoto Kaneko",
        path: "",
        style: style
      };
    }))
    .pipe(layout("./layouts/index.ejs"))
    .pipe(layout("./layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public"));
});

gulp.task("posts", ["stylesheets"], () => {
  let style = fs.readFileSync("./build/style.css", "utf-8");

  gulp.src("./contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(index("./layouts/posts/index.ejs", { path: path }))
    .pipe(data((file) => {
      return {
        ogType: "article",
        pageDescription: "Naoto Kaneko's posts",
        pageTitle: "Naoto Kaneko's posts",
        path: "/posts/index.html",
        style: style
      };
    }))
    .pipe(layout("./layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public/posts"))
});

gulp.task("post", ["stylesheets"], () => {
  let style = fs.readFileSync("./build/style.css", "utf-8");

  gulp.src("./contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(data((file) => {
      return {
        ogType: "article",
        pageDescription: file.frontMatter.description || "Naoto Kaneko's post page",
        pageTitle: file.frontMatter.title,
        path: `/posts/${path.basename(file.path)}`,
        style: style
      };
    }))
    .pipe(layout("./layouts/posts/post.ejs", { path: path }))
    .pipe(layout("./layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public/posts"));
});

gulp.task("stylesheets", () => {
  let srcFiles = [
    "./node_modules/ress/ress.css",
    "./stylesheets/style.sass",
    "./stylesheets/large.sass"
  ];

  gulp.src(srcFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("style.css"))
    .pipe(clean())
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  })
});

gulp.task("default", ["homepage", "post", "posts"]);

gulp.task("server", ["default", "browser-sync"], () => {
  gulp.watch("./contents/index.md", ["homepage"]).on("change", browserSync.reload);
  gulp.watch("./contents/posts/*.md", ["post", "posts"]).on("change", browserSync.reload);
  gulp.watch("./layouts/index.ejs", ["homepage"]).on("change", browserSync.reload);
  gulp.watch("./layouts/posts/post.ejs", ["post"]).on("change", browserSync.reload);
  gulp.watch("./layouts/posts/index.ejs", ["posts"]).on("change", browserSync.reload);
  gulp.watch("./stylesheets/**/*.sass", ["stylesheets"]);
});
