<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="(post, index) in posts" v-bind:key="index">
        <nuxt-link to="#">{{ post.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { fileMap } from "assets/contents/summary.json";

export default {
  computed: {
    posts() {
      return Object.values(fileMap).sort((a, b) => {
        const aId = Number(a.base.replace(a.ext, ""));
        const bId = Number(b.base.replace(b.ext, ""));
        return bId - aId;
      });
    }
  },
  head() {
    return {
      title: "Naoto Kaneko's posts",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Naoto Kaneko's posts"
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${process.env.baseUrl}/posts/`
        }
      ]
    };
  }
};
</script>
