<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  padding: 0 0 0.5rem 0;
  border-bottom: 1px solid #333;
}

@media (prefers-color-scheme: dark) {
  h1 {
    border-bottom: 1px solid #eceff4;
  }
}
</style>
