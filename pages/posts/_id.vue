<template>
  <div>
    <page-title>{{ title }}</page-title>
    <post-body v-bind:body="body"></post-body>
    <ul>
      <nuxt-link to="/">Top</nuxt-link>
      <span>|</span>
      <nuxt-link to="/posts/">Posts</nuxt-link>
    </ul>
  </div>
</template>

<style scoped>
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

export default {
  data() {
    return {
      title: "",
      description: "",
      body: ""
    };
  },
  async asyncData({ params }) {
    const id = params.id.replace(".html", "");
    const content = await import(`assets/contents/${id}.json`);
    return {
      title: content.title,
      description: content.description,
      body: content.bodyHtml
    };
  },
  components: {
    PageTitle,
    PostBody
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
