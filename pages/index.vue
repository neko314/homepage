<template>
  <div>
    <page-title>Naoto Kaneko</page-title>
    <ul>
      <li>
        <nuxt-link to="/posts/">Posts</nuxt-link>
      </li>
      <li>
        <a href="https://github.com/naoty">GitHub</a>
      </li>
      <li>
        <a href="https://twitter.com/naoty_k">Twitter</a>
      </li>
      <li>
        <a href="https://atcoder.jp/users/naoty">AtCoder</a>
      </li>
    </ul>
  </div>
</template>

<script>
import PageTitle from "~/components/PageTitle.vue";

export default {
  components: {
    PageTitle
  },
  head() {
    return {
      title: "Naoto Kaneko",
      meta: [
        { name: "description", content: "Naoto Kaneko's homepage" },
        { property: "og:type", content: "profile" },
        { property: "og:title", content: "Naoto Kaneko" },
        { property: "og:description", content: "Naoto Kaneko's homepage" },
        { property: "og:url", content: process.env.baseUrl },
        { name: "twitter:title", content: "Naoto Kaneko" },
        { name: "twitter:description", content: "Naoto Kaneko's homepage" }
      ],
      link: [{ rel: "canoical", href: process.env.baseUrl }]
    };
  }
};
</script>
