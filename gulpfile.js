let browserSync   = require("browser-sync").create();
let clean         = require("gulp-clean-css");
let concat        = require("gulp-concat");
let config        = require("./config.json");
let data          = require("gulp-data");
let DateTime      = require("luxon").DateTime;
let frontMatter   = require("gulp-front-matter");
let fs            = require("fs");
let gulp          = require("gulp");
let htmlmin       = require("gulp-htmlmin");
let index         = require("gulp-ejs-index");
let layout        = require("gulp-ejs-layout");
let markdown      = require("gulp-markdown");
let path          = require("path");
let prefetchLinks = require("gulp-prefetch-links");
let rename        = require("gulp-rename");
let sass          = require("gulp-sass");
let sort          = require("gulp-sort");

gulp.task("default", ["all"], () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: "public"
    }
  });

  gulp.watch("contents/index.md", ["reload-top"]);
  gulp.watch("contents/posts/*.md", ["reload-posts", "reload-post"]);
  gulp.watch("layouts/base.ejs", ["reload-top", "reload-posts", "reload-post"]);
  gulp.watch("layouts/index.ejs", ["reload-top"]);
  gulp.watch("layouts/posts/index.ejs", ["reload-posts"]);
  gulp.watch("layouts/posts/post.ejs", ["reload-post"]);
  gulp.watch("stylesheets/*.sass", ["reload-all"]);
});

gulp.task("all", ["top", "posts", "post", "style"]);

gulp.task("top", ["style"], () => {
  return gulp.src("contents/index.md")
    .pipe(markdown())
    .pipe(rename({ extname: ".html" }))
    .pipe(layout("layouts/index.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public"));
});

gulp.task("posts", ["style"], () => {
  let postData = file => ({
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
    .pipe(index("layouts/posts/index.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public/posts"));
});

gulp.task("post", ["style"], () => {
  let postData = file => ({
    pageDescription: file.frontMatter.description || config["post"]["pageDescription"],
    pageImage: file.frontMatter.image || config["post"]["pageImage"],
    pageTitle: file.frontMatter.title,
    path: `/posts/${path.basename(file.path)}`,
    time: DateTime.fromISO(file.frontMatter.time)
  });

  return gulp.src("contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(rename({ extname: ".html" }))
    .pipe(data(postData))
    .pipe(layout("layouts/posts/post.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public/posts"));
});

gulp.task("style", () => {
  let srcFiles = [
    "node_modules/ress/ress.css",
    "stylesheets/style.sass",
    "stylesheets/large.sass"
  ];

  return gulp.src(srcFiles)
    .pipe(sass())
    .pipe(concat("main.css"))
    .pipe(clean())
    .pipe(gulp.dest("public/stylesheets"));
});

for (let taskname of ["all", "top", "posts", "post", "style"]) {
  gulp.task(`reload-${taskname}`, [taskname], (done) => {
    browserSync.reload();
    done();
  });
}
