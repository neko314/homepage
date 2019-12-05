import Vue from "vue";
import Router from "vue-router";

import Index from "./pages/index";
import PostsIndex from "./pages/posts/index";
import PostId from "./pages/posts/_id";
import PostsTagIndex from "./pages/posts/_tag/index";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      { path: "/", component: Index },
      { path: "/index", component: Index },
      { path: "/posts/", component: PostsIndex },
      { path: "/posts/index", component: PostsIndex },
      { path: "/posts/:id(\\d+)", component: PostId },
      { path: "/posts/:id(\\d+)\\.html", component: PostId },
      { path: "/posts/:tag/", component: PostsTagIndex },
      { path: "/posts/:tag/index", component: PostsTagIndex }
    ]
  });
}
