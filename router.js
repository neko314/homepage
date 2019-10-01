import Vue from "vue";
import Router from "vue-router";

import Index from "./pages/index";
import PostsIndex from "./pages/posts/index";
import PostId from "./pages/posts/_id";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: Index
      },
      {
        path: "/posts/",
        component: PostsIndex
      },
      {
        path: "/posts/:id",
        component: PostId
      }
    ]
  });
}
