<template>
  <div>
    <p>GitHubで質問や訂正を受け付けています。</p>
    <ul>
      <li>
        <a
          href="https://github.com/naoty/homepage/issues/new?template=question.md&assignees=naoty&labels=questions"
        >Issue</a>
      </li>
      <li>
        <a :href="pull_request_url">Pull Request</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  border: 1px solid #2e3440;
  margin: 1rem;
  padding: 1rem;
}

p {
  margin: 0 0 1rem 0;
}

@media (prefers-color-scheme: dark) {
  div {
    border: 1px solid #eceff4;
  }
}
</style>

<script>
export default {
  props: {
    id: Number
  },
  computed: {
    pull_request_url() {
      return `https://github.com/naoty/homepage/edit/master/contents/posts/${this.id}.md`;
    }
  }
};
</script>
