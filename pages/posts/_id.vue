<template>
  <div>
    <page-title>{{ title }}</page-title>
    <p>
      <time-label :timeString="time" />
    </p>
    <post-body :body="body"></post-body>
    <ul>
      <nuxt-link to="/">Top</nuxt-link>
      <span>|</span>
      <nuxt-link to="/posts/">Posts</nuxt-link>
    </ul>
  </div>
</template>

<style scoped>
p {
  margin: 0 0 2rem 0;
}

ul {
  text-align: center;
}

span {
  margin: 0 0.25rem;
}
</style>

<script>
import PageTitle from "~/components/PageTitle.vue";
import PostBody from "~/components/PostBody.vue";
import TimeLabel from "~/components/TimeLabel.vue";

export default {
  data() {
    return {
      title: undefined,
      description: undefined,
      time: undefined,
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
      body: content.bodyHtml
    };
  },
  components: {
    PageTitle,
    PostBody,
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
