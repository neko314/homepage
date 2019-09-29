<template>
  <div>
    <page-title>Posts</page-title>
    <ul>
      <li v-for="(post, index) in posts" v-bind:key="index">
        <nuxt-link v-bind:to="post.id + '.html'">{{ post.frontMatter.title }}</nuxt-link>
        <tag-label v-for="(tag, index) in post.frontMatter.tags" :key="index" :name="tag" />
      </li>
    </ul>
    <p class="navigation-links">
      <nuxt-link to="/">Top</nuxt-link>
    </p>
  </div>
</template>

<style scoped>
.navigation-links {
  margin-top: 2rem;
  text-align: center;
}
</style>

<script>
import PageTitle from "~/components/PageTitle.vue";
import TagLabel from "~/components/TagLabel.vue";
import summary from "assets/contents/posts/summary.json";

export default {
  computed: {
    posts() {
      return Object.values(summary).sort((a, b) => Number(b.id) - Number(a.id));
    },
    url() {
      return `${process.env.baseUrl}/posts/`;
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
        { name: "description", content: "Naoto Kaneko's posts" },
        { property: "og:type", content: "blog" },
        { property: "og:title", content: "Naoto Kaneko's posts" },
        { property: "og:description", content: "Naoto Kaneko's posts" },
        { property: "og:url", content: this.url },
        { name: "twitter:title", content: "Naoto Kaneko's posts" },
        { name: "twitter:description", content: "Naoto Kaneko's posts" }
      ],
      link: [
        { rel: "canonical", href: this.url },
        {
          rel: "alternate",
          type: "application/atom+xml",
          href: "/posts/feed.atom",
          title: "Atom"
        }
      ]
    };
  }
};
</script>
