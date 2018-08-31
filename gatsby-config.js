module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "src/contents/posts/"
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
