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

gulp.task("watch", () => {
  gulp.watch("contents/index.md", ["top"]);
  gulp.watch("contents/posts/*.md", ["posts", "post"]);
  gulp.watch("layouts/base.ejs", ["top", "posts", "post"]);
  gulp.watch("layouts/index.ejs", ["top"]);
  gulp.watch("layouts/posts/index.ejs", ["posts"]);
  gulp.watch("layouts/posts/post.ejs", ["post"]);
  gulp.watch("stylesheets/*.sass", ["all"]);
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
  return gulp.src(["node_modules/ress/ress.css", "stylesheets/*.sass"])
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(clean())
    .pipe(gulp.dest("build"));
});

// let clean         = require("gulp-clean-css");
// let concat        = require("gulp-concat");
// let data          = require("gulp-data");
// let frontMatter   = require("gulp-front-matter");
// let fs            = require("fs");
// let gulp          = require("gulp");
// let htmlmin       = require("gulp-htmlmin");
// let index         = require("gulp-ejs-index");
// let layout        = require("gulp-ejs-layout");
// let markdown      = require("gulp-markdown");
// let path          = require("path");
// let prefetchLinks = require("gulp-prefetch-links");
// let sass          = require("gulp-sass");
//
// gulp.task("homepage", ["stylesheets"], () => {
//   let style = fs.readFileSync("./build/style.css", "utf-8");
//
//   gulp.src("./contents/index.md")
//     .pipe(markdown())
//     .pipe(data((file) => {
//       return {
//         ogType: "profile",
//         pageDescription: "Naoto Kaneko's homepage",
//         pageImage: "/icons/256x256.png",
//         pageTitle: "Naoto Kaneko",
//         path: "",
//         style: style
//       };
//     }))
//     .pipe(layout("./layouts/index.ejs"))
//     .pipe(prefetchLinks())
//     .pipe(layout("./layouts/base.ejs"))
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("./public"));
// });
//
// gulp.task("posts", ["stylesheets"], () => {
//   let style = fs.readFileSync("./build/style.css", "utf-8");
//
//   gulp.src("./contents/posts/*.md")
//     .pipe(frontMatter())
//     .pipe(markdown())
//     .pipe(index("./layouts/posts/index.ejs", { path: path }))
//     .pipe(data((file) => {
//       return {
//         ogType: "article",
//         pageDescription: "Naoto Kaneko's posts",
//         pageImage: "/icons/256x256.png",
//         pageTitle: "Naoto Kaneko's posts",
//         path: "/posts/index.html",
//         style: style
//       };
//     }))
//     .pipe(prefetchLinks())
//     .pipe(layout("./layouts/base.ejs"))
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("./public/posts"))
// });
//
// gulp.task("post", ["stylesheets"], () => {
//   let style = fs.readFileSync("./build/style.css", "utf-8");
//
//   gulp.src("./contents/posts/*.md")
//     .pipe(frontMatter())
//     .pipe(markdown())
//     .pipe(data((file) => {
//       return {
//         ogType: "article",
//         pageDescription: file.frontMatter.description || "Naoto Kaneko's post page",
//         pageImage: file.frontMatter.image || "/icons/256x256.png",
//         pageTitle: file.frontMatter.title,
//         path: `/posts/${path.basename(file.path)}`,
//         style: style
//       };
//     }))
//     .pipe(layout("./layouts/posts/post.ejs", { path: path }))
//     .pipe(prefetchLinks())
//     .pipe(layout("./layouts/base.ejs"))
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("./public/posts"));
// });
//
// gulp.task("stylesheets", () => {
//   let srcFiles = [
//     "./node_modules/ress/ress.css",
//     "./stylesheets/style.sass",
//     "./stylesheets/large.sass"
//   ];
//
//   gulp.src(srcFiles)
//     .pipe(sass().on("error", sass.logError))
//     .pipe(concat("style.css"))
//     .pipe(clean())
//     .pipe(gulp.dest("./build"))
// });
//
// gulp.task("default", ["homepage", "post", "posts"]);
//
// gulp.task("server", ["default", "browser-sync"], () => {
//   gulp.watch("./contents/index.md", ["homepage"]);
//   gulp.watch("./contents/posts/*.md", ["post", "posts"]);
//   gulp.watch("./layouts/index.ejs", ["homepage"]);
//   gulp.watch("./layouts/posts/post.ejs", ["post"]);
//   gulp.watch("./layouts/posts/index.ejs", ["posts"]);
//   gulp.watch("./stylesheets/**/*.sass", ["stylesheets"]);
// });
