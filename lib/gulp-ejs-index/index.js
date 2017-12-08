let ejs     = require("ejs");
let fs      = require("fs");
let through = require("through2");
let Vinyl   = require("vinyl");

module.exports = (filename, indexData = {}, options = {}) => {
  let files = [];
  let buffer = (file, encoding, callback) => {
    files.push(file);
    callback();
  };

  let index = fs.readFileSync(filename, "utf-8");
  let render = (callback) => {
    let data = Object.assign(indexData, { files: files });
    let result = ejs.render(index, data, options);

    let file = new Vinyl({ path: "index.html" });
    file.contents = new Buffer(result);
    callback(null, file);
  };

  return through.obj(buffer, render);
};
