const path = require("path");

module.exports = {
  entry: "./src/picomap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "picomap.js",
    library: "picomap",
  },
  mode: "production",
};
