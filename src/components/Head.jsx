import React from "react";
import Helmet from "react-helmet";

export default ({ title, description, url, imageURL }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="theme-color" content="white" />
    <meta property="og:type" content="profile" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={imageURL} />
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:site" content="@naoty_k" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={imageURL} />
    <link rel="icon" type="image/png" href="/icons/favicon.png" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    <link rel="canonical" href={url} />
    <link rel="manifest" href="/manifest.json" />
  </Helmet>
);
