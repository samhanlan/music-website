const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getHtmlPluginConfig = (name) => ({
  template: `./src/page-${name}/${name}.html`,
  inject: true,
  chunks: [name],
  filename: name === "index" ? "index.html" : `${name}/${name}.html`,
});

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlPluginConfig("index")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("lifetime-access")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("freedom-and-such")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("audio-engineer")),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: false,
    inline: false,
    writeToDisk: true,
    before: function (app, _server, _compiler) {
      app.get("/", function (_req, res) {
        res.sendFile(path.join(__dirname, "dist/index.html"));
      });
      app.get("/singer-songwriter", function (_req, res) {
        res.sendFile(
          path.join(__dirname, "dist/lifetime-access/lifetime-access.html")
        );
      });
      app.get("/audio-engineer", function (_req, res) {
        res.sendFile(
          path.join(__dirname, "dist/audio-engineer/audio-engineer.html")
        );
      });
      app.get("/freedom-and-such", function (_req, res) {
        res.sendFile(
          path.join(__dirname, "dist/freedom-and-such/freedom-and-such.html")
        );
      });
    },
  },
});
