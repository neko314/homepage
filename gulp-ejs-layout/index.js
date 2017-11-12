let ejs = require("ejs");
let fs = require("fs");
let through = require("through2");

module.exports = (filename, options) => {
  let layout = fs.readFileSync(filename, "utf-8");

  let transform = (file, encoding, callback) => {
    let data = { content: file.contents.toString() };
    let result = ejs.render(layout, data, {});
    file.contents = new Buffer(result);

    callback(null, file);
  };

  return through.obj(transform);
};
