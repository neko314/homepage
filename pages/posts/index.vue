<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li>
        <a href="#">ミニマムなwebpack loader</a>
      </li>
      <li>
        <a href="#">HHKB-BTの接続先切り替え</a>
      </li>
      <li>
        <a href="#">ステータスコードをログに出力するhttp.Handler</a>
      </li>
      <li>
        <a href="#">goroutineの実行パターン</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Naoto Kaneko's posts",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Naoto Kaneko's posts"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Naoto Kaneko's posts"
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${process.env.baseUrl}/posts/`
        }
      ]
    };
  }
};
</script>
