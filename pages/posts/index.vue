<template>
  <div>
    <page-title>Posts</page-title>
    <ul>
      <li v-for="(post, index) in posts" v-bind:key="index">
        <nuxt-link v-bind:to="post.base.replace('.json', '.html')">{{ post.title }}</nuxt-link>
        <tag-label v-for="(tag, index) in post.tags" :key="index" :name="tag" />
      </li>
    </ul>
    <p class="navigation-links">
      <nuxt-link to="/">Top</nuxt-link>
    </p>
  </div>
</template>

<style scoped>
.navigation-links {
  text-align: center;
}
</style>

<script>
import PageTitle from "~/components/PageTitle.vue";
import TagLabel from "~/components/TagLabel.vue";
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
  components: {
    PageTitle,
    TagLabel
  },
  head() {
    return {
      title: "Naoto Kaneko's posts",
      meta: [
        {
          name: "description",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Naoto Kaneko's posts"
        },
        {
          name: "og:description",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Naoto Kaneko's posts"
        },
        {
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
