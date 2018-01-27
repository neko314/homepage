const browserSync   = require("browser-sync").create();
const config        = require("./config.json");
const data          = require("gulp-data");
const DateTime      = require("luxon").DateTime;
const frontMatter   = require("gulp-front-matter");
const fs            = require("fs");
const gulp          = require("gulp");
const htmlmin       = require("gulp-htmlmin");
const index         = require("gulp-ejs-index");
const layout        = require("gulp-ejs-layout");
const mathjax       = require("gulp-mathjax-node");
const markdown      = require("gulp-markdown");
const path          = require("path");
const postcss       = require("gulp-postcss");
const prefetchLinks = require("gulp-prefetch-links");
const rename        = require("gulp-rename");
const sort          = require("gulp-sort");

gulp.task("default", ["all"], () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: "public"
    }
  });

  gulp.watch("contents/index.md", ["reload-top"]);
  gulp.watch("contents/posts/*.md", ["reload-posts", "reload-post", "reload-feed"]);
  gulp.watch("layouts/index.html.ejs", ["reload-top"]);
  gulp.watch("layouts/posts/index.atom.ejs", ["reload-feed"]);
  gulp.watch("layouts/posts/index.html.ejs", ["reload-posts"]);
  gulp.watch("layouts/posts/post.html.ejs", ["reload-post"]);
  gulp.watch("stylesheets/**/*.css", ["reload-all"]);
});

gulp.task("all", ["top", "posts", "post", "style", "feed"]);

gulp.task("top", ["style"], () => {
  return gulp.src("contents/index.md")
    .pipe(markdown())
    .pipe(rename({ extname: ".html" }))
    .pipe(layout("layouts/index.html.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public"));
});

gulp.task("posts", ["style"], () => {
  const postData = file => ({
    postPath: `/posts/${path.basename(file.path)}`,
    time: DateTime.fromISO(file.frontMatter.time),
    title: file.frontMatter.title
  });

  return gulp.src("contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(rename({ extname: ".html" }))
    .pipe(data(postData))
    .pipe(sort((file1, file2) => file2.data.time - file1.data.time ))
    .pipe(index("layouts/posts/index.html.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public/posts"));
});

gulp.task("post", ["style"], () => {
  const postData = file => ({
    pageDescription: file.frontMatter.description || config["post"]["pageDescription"],
    pageImage: file.frontMatter.image || config["post"]["pageImage"],
    pageTitle: file.frontMatter.title,
    path: `/posts/${path.basename(file.path)}`,
    time: DateTime.fromISO(file.frontMatter.time)
  });

  return gulp.src("contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(mathjax())
    .pipe(rename({ extname: ".html" }))
    .pipe(data(postData))
    .pipe(layout("layouts/posts/post.html.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public/posts"));
});

gulp.task("style", () => {
  return gulp.src("stylesheets/application.css")
    .pipe(postcss())
    .pipe(gulp.dest("public/stylesheets"))
});

gulp.task("feed", () => {
  const postData = file => ({
    summary: file.frontMatter.description || file.frontMatter.title,
    time: DateTime.fromISO(file.frontMatter.time),
    title: file.frontMatter.title,
    url: `https://naoty.github.io/posts/${path.basename(file.path)}`
  });

  return gulp.src("contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(rename({ extname: ".html" }))
    .pipe(data(postData))
    .pipe(sort((file1, file2) => file2.data.time - file1.data.time))
    .pipe(index("layouts/posts/index.atom.ejs"))
    .pipe(rename({ extname: ".atom" }))
    .pipe(gulp.dest("public/posts"))
});

for (const taskname of ["all", "top", "posts", "post", "style", "feed"]) {
  gulp.task(`reload-${taskname}`, [taskname], (done) => {
    browserSync.reload();
    done();
  });
}
