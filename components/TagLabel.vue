<template>
  <span>#{{ name }}</span>
</template>

<style scoped>
span {
  color: rgba(0, 0, 0, 0.54);
  font-family: monospace;
  font-size: 0.8rem;
  margin: 0 0 0 0.5rem;
}
</style>

<script>
export default {
  props: {
    name: String
  }
};
</script>
