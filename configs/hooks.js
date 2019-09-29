module.exports = {
  generate: {
    page(generator) {
      generator.path = generator.path.replace(
        /\/posts\/(?<id>\d+)\/index\.html/,
        "/posts/$<id>.html"
      );
      return generator;
    }
  }
};
