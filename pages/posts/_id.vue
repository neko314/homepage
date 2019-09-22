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
      title: undefined,
      description: undefined,
      time: undefined,
      tags: [],
      body: undefined
    };
  },
  async asyncData({ params }) {
    const id = params.id.replace(".html", "");
    const content = await import(`assets/contents/${id}.json`);
    return {
      title: content.title,
      description: content.description,
      time: content.time,
      tags: content.tags,
      body: content.bodyHtml
    };
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
    return {
      title: this.title,
      description: this.description
    };
  }
};
</script>
