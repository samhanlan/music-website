const merge = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            chunkFilename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/page-index/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/page-singer-songwriter/singer-songwriter.html',
            inject: true,
            chunks: ['singer-songwriter'],
            filename: 'singer-songwriter.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            }
        }),
        new HTMLInlineCSSWebpackPlugin(),
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            // NB: repeat this instantiation for all separate html files
            // new HtmlWebpackPlugin({
            //     template: './src/page-index/index.html',
            //     inject: true,
            //     chunks: ['index'],
            //     filename: 'index.html',
            //     minify: {
            //         removeAttributeQuotes: true,
            //         collapseWhitespace: true,
            //     }
            // }),
            // new HtmlWebpackPlugin({
            //     template: './src/page-singer-songwriter/singer-songwriter.html',
            //     inject: true,
            //     chunks: ['singer-songwriter'],
            //     filename: 'singer-songwriter.html',
            //     minify: {
            //         removeAttributeQuotes: true,
            //         collapseWhitespace: true,
            //     }
            // }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    }
})
