<template>
  <div>
    <page-title>{{ title }}</page-title>
    <p>
      <time-label :timeString="time" />
      <tag-label v-for="(tag, index) in tags" :key="index" :name="tag" />
    </p>
    <post-body :body="body"></post-body>
    <ul class="navigation-links">
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

.navigation-links {
  margin-top: 2rem;
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
  head() {
    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: this.title },
      { property: "og:url", content: this.url },
      { name: "twitter:title", content: this.title }
    ];

    if (this.description !== undefined) {
      meta.push({ name: "description", content: this.description });
      meta.push({ property: "og:description", content: this.description });
      meta.push({ name: "twitter:description", content: this.description });
    }

    return {
      title: this.title,
      link: [
        { rel: "canonical", href: this.url },
        {
          rel: "alternate",
          type: "application/atom+xml",
          href: "/posts/feed.atom",
          title: "Atom"
        }
      ],
      meta
    };
  }
};
</script>
