const merge = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[hash].bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            // NB: repeat this instantiation for all separate html files
            new HtmlWebpackPlugin({
                template: './src/page-singer-songwriter/index.html',
                inject: true,
                chunks: ['singer-songwriter'],
                filename: 'index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                }
            }),
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
