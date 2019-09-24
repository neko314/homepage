<template>
  <article v-html="body"></article>
</template>

<style scoped>
article {
  line-height: 2;
}

article >>> h1,
article >>> h2,
article >>> h3,
article >>> h4,
article >>> h5,
article >>> h6 {
  margin: 2rem 0 1rem 0;
  padding: 0;
}

article >>> h1 {
  font-size: 1.5rem;
}

article >>> p,
article >>> table,
article >>> pre {
  margin: 0 0 1rem 0;
  padding: 0;
}

article >>> pre {
  font-size: 0.85rem;
  line-height: 1.8;
  overflow-x: auto;
}

article >>> img {
  display: block;
  width: 100%;
}

article >>> ul,
article >>> ol {
  margin: 0 0 1rem 0;
  padding: 0 0 0 2rem;
}

article >>> li {
  margin: 0 0 0.5rem 0;
  padding: 0;
}

article >>> table,
article >>> th,
article >>> td {
  border: 1px solid #333;
}

article >>> table {
  border-collapse: collapse;
  margin: 0 0 1rem 0;
  padding: 0;
  width: 100%;
}

article >>> th,
article >>> td {
  padding: 0.25rem;
}

article >>> hr {
  margin: 2rem 0;
}
</style>

<script>
import "prismjs/themes/prism-tomorrow.css";

export default {
  props: {
    body: String
  }
};
</script>
