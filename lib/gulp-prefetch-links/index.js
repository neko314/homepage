let cheerio = require("cheerio");
let through = require("through2");

let parse = (html) => {
  let $ = cheerio.load(html);
  let links = $("a")
    .map((index, element) => { return $(element).attr("href"); })
    .filter((i, element) => { return element.startsWith("/"); })
    .map((index, element) => { return `<link rel="prefetch" href="${element}">`; });
  return links.get().join("\n");
};

let prefetchLinks = () => {
  let transform = (file, encoding, callback) => {
    let links = parse(file.contents.toString());
    file.data = Object.assign(file.data || {}, { prefetchLinks: links });
    callback(null, file);
  };
  return through.obj(transform);
};

module.exports = prefetchLinks;
