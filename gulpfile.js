let browserSync   = require("browser-sync").create();
let clean         = require("gulp-clean-css");
let concat        = require("gulp-concat");
let config        = require("./config.json");
let data          = require("gulp-data");
let frontMatter   = require("gulp-front-matter");
let fs            = require("fs");
let gulp          = require("gulp");
let htmlmin       = require("gulp-htmlmin");
let index         = require("gulp-ejs-index");
let layout        = require("gulp-ejs-layout");
let markdown      = require("gulp-markdown");
let path          = require("path");
let prefetchLinks = require("gulp-prefetch-links");
let sass          = require("gulp-sass");

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
  let style = fs.readFileSync("build/style.css");

  return gulp.src("contents/index.md")
    .pipe(markdown())
    .pipe(data(file => ({ ...config["top"], style: style })))
    .pipe(layout("layouts/index.ejs"))
    .pipe(prefetchLinks())
    .pipe(layout("layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public"));
});

gulp.task("posts", ["style"], () => {
  let style = fs.readFileSync("build/style.css");

  return gulp.src("contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(index("layouts/posts/index.ejs", { path: path }))
    .pipe(data(file => ({ ...config["posts"], style: style })))
    .pipe(prefetchLinks())
    .pipe(layout("layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public/posts"));
});

gulp.task("post", ["style"], () => {
  let style = fs.readFileSync("build/style.css");
  let postData = file => ({
    ogType: config["post"]["ogType"],
    pageDescription: file.frontMatter.description || config["post"]["pageDescription"],
    pageImage: file.frontMatter.image || config["post"]["pageImage"],
    pageTitle: file.frontMatter.title,
    path: `/posts/${path.basename(file.path)}`,
    style: style
  });

  return gulp.src("contents/posts/*.md")
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(layout("layouts/posts/post.ejs", { path: path }))
    .pipe(data(postData))
    .pipe(prefetchLinks())
    .pipe(layout("layouts/base.ejs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public/posts"));
});

gulp.task("style", () => {
  return gulp.src(["node_modules/ress/ress.css", "stylesheets/style.sass", "stylesheets/large.sass"])
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(clean())
    .pipe(gulp.dest("build"));
});

for (let taskname of ["all", "top", "posts", "post", "style"]) {
  gulp.task(`reload-${taskname}`, [taskname], (done) => {
    browserSync.reload();
    done();
  });
}
