const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const getHtmlPluginConfig = (name) => ({
  template: `./src/page-${name}/${name}.html`,
  inject: true,
  inlineSource: ".js$",
  chunks: [name],
  filename: name === "index" ? "index.html" : `${name}/index.html`,
  minify: {
    removeComments: true,
    removeAttributeQuotes: true,
    collapseWhitespace: true,
  },
});

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "http://samhanlan.com/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) =>
        name === "index"
          ? "index.[contentHash].css"
          : `${name}/${name}.[contentHash].css`,
    }),
    new HtmlWebpackPlugin(getHtmlPluginConfig("index")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("singer-songwriter")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("freedom-and-such")),
    new HtmlWebpackPlugin(getHtmlPluginConfig("audio-engineer")),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
});
