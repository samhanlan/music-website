const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getHtmlPluginConfig = name => ({
  template: `./src/page-${name}/${name}.html`,
  inject: true,
  chunks: [name],
  filename: name === "index" ? "index.html" : `${name}/${name}.html`
});

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/"
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlPluginConfig("index")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("singer-songwriter")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("freedom-and-such")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("audio-engineer"))
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    hot: false,
    inline: false,
    writeToDisk: true,
    before: function(app, server, compiler) {
      app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "dist/index.html"));
      });
      app.get("/singer-songwriter", function(req, res) {
        res.sendFile(
          path.join(__dirname, "dist/singer-songwriter/singer-songwriter.html")
        );
      });
      app.get("/audio-engineer", function(req, res) {
        res.sendFile(
          path.join(__dirname, "dist/audio-engineer/audio-engineer.html")
        );
      });
      app.get("/freedom-and-such", function(req, res) {
        res.sendFile(
          path.join(__dirname, "dist/freedom-and-such/freedom-and-such.html")
        );
      });
    }
  }
});
