<template>
  <div>
    <page-title class="tag-title">#{{ this.$route.params.tag }}</page-title>
    <ul>
      <li v-for="(post, index) in posts" v-bind:key="index">
        <nuxt-link v-bind:to="'/posts/' + post.id + '.html'">{{ post.frontMatter.title }}</nuxt-link>
        <tag-label v-for="(tag, index) in post.frontMatter.tags" :key="index" :name="tag" />
      </li>
    </ul>
    <p class="navigation-links">
      <nuxt-link to="/">Top</nuxt-link>
      <span class="separator">|</span>
      <nuxt-link to="/posts/">All</nuxt-link>
    </p>
  </div>
</template>

<style scoped>
.tag-title {
  font-family: monospace;
}

.navigation-links {
  margin-top: 2rem;
  text-align: center;
}

.separator {
  margin: 0 0.25rem;
}
</style>

<script>
import PageTitle from "~/components/PageTitle.vue";
import TagLabel from "~/components/TagLabel.vue";
import summary from "assets/contents/posts/summary.json";

export default {
  computed: {
    posts() {
      const tag = this.$route.params.tag;
      return Object.values(summary)
        .filter(
          ({ frontMatter: { tags } }) =>
            tags !== undefined && tags.includes(tag)
        )
        .sort((a, b) => Number(b.id) - Number(a.id));
    }
  },
  components: { PageTitle, TagLabel },
  head() {
    return {
      title: `Naoto Kaneko's posts #${this.$route.params.tag}`,
      meta: [
        {
          name: "description",
          content: `Naoto Kaneko's posts #${this.$route.params.tag}`
        },
        { property: "og:type", content: "blog" },
        {
          property: "og:title",
          content: `Naoto Kaneko's posts #${this.$route.params.tag}`
        },
        {
          property: "og:description",
          content: `Naoto Kaneko's posts #${this.$route.params.tag}`
        },
        { property: "og:url", content: this.url },
        {
          name: "twitter:title",
          content: `Naoto Kaneko's posts #${this.$route.params.tag}`
        },
        {
          name: "twitter:description",
          content: `Naoto Kaneko's posts #${this.$route.params.tag}`
        }
      ],
      link: [{ rel: "canonical", href: this.url }]
    };
  }
};
</script>
