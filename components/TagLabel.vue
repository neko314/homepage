<template>
  <nuxt-link :to="'/posts/' + name + '/'">#{{ name }}</nuxt-link>
</template>

<style scoped>
a {
  color: rgba(0, 0, 0, 0.54);
  font-family: "SF Mono", Menlo, "Courier", monospace;
  font-size: 0.8rem;
  margin: 0 0 0 0.5rem;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  a,
  a:visited {
    color: #d8dee9;
  }
}
</style>

<script>
export default {
  props: {
    name: String
  }
};
</script>
