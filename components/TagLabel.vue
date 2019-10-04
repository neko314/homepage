<template>
  <nuxt-link :to="'/posts/' + name + '/'">#{{ name }}</nuxt-link>
</template>

<style scoped>
a {
  color: rgba(0, 0, 0, 0.54);
  font-family: monospace;
  font-size: 0.8rem;
  margin: 0 0 0 0.5rem;
  text-decoration: none;
}
</style>

<script>
export default {
  props: {
    name: String
  }
};
</script>
