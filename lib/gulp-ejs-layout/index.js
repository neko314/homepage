let ejs     = require("ejs");
let fs      = require("fs");
let through = require("through2");

module.exports = (filename, layoutData = {}, options = {}) => {
  let layout = fs.readFileSync(filename, "utf-8");

  let transform = (file, encoding, callback) => {
    let fileData = file.data || {};
    let data = Object.assign(layoutData, fileData, {
      content: file.contents.toString(),
      file: file
    });
    let result = ejs.render(layout, data, options);
    file.contents = new Buffer(result);

    callback(null, file);
  };

  return through.obj(transform);
};
