<template>
  <div>
    <page-title>{{ title }}</page-title>
    <p>
      <time-label :timeString="time" />
      <tag-label v-for="(tag, index) in tags" :key="index" :name="tag" />
    </p>
    <post-body :body="body"></post-body>
    <ul>
      <nuxt-link to="/">Top</nuxt-link>
      <span class="separator">|</span>
      <nuxt-link to="/posts/">Posts</nuxt-link>
    </ul>
  </div>
</template>

<style scoped>
p {
  margin: 0 0 2rem 0;
}

ul {
  padding: 0;
  text-align: center;
}

.separator {
  margin: 0 0.25rem;
}
</style>

<script>
import PageTitle from "~/components/PageTitle.vue";
import PostBody from "~/components/PostBody.vue";
import TagLabel from "~/components/TagLabel.vue";
import TimeLabel from "~/components/TimeLabel.vue";

export default {
  data() {
    return {
      id: undefined,
      title: undefined,
      description: undefined,
      time: undefined,
      tags: [],
      body: undefined
    };
  },
  async asyncData({ params }) {
    const id = params.id.replace(".html", "");
    const content = await import(`assets/contents/posts/${id}.json`);
    return {
      id,
      title: content.frontMatter.title,
      description: content.frontMatter.description,
      time: content.frontMatter.time,
      tags: content.frontMatter.tags,
      body: content.html
    };
  },
  computed: {
    url() {
      return `${process.env.baseUrl}/posts/${this.id}.html`;
    }
  },
  components: {
    PageTitle,
    PostBody,
    TagLabel,
    TimeLabel
  },
  validate({ params }) {
    return params.id.endsWith(".html");
  },
  head() {
    const meta = [
      { hid: "og:title", property: "og:title", content: this.title },
      { hid: "og:url", property: "og:url", content: this.url },
      { hid: "twitter:title", property: "twitter:title", content: this.title }
    ];

    if (this.description !== undefined) {
      meta.push({ name: "description", content: this.description });
      meta.push({ name: "og:description", content: this.description });
      meta.push({ name: "twitter:description", content: this.description });
    }

    return {
      title: this.title,
      link: [{ hid: "canonical", rel: "canonical", href: this.url }],
      meta
    };
  }
};
</script>
