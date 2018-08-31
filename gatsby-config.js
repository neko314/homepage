module.exports = {
  siteMetadata: {
    rootURL: process.env.NODE_ENV == "production" ? "https://naoty.github.io" : "http://localhost:8000"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "contents/posts/"
      }
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
      }
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet"
  ]
}
