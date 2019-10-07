const merge = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        hot: false,
        inline: false,
        writeToDisk: true,
    },
    output: {
        filename(chunkData) {
            return chunkData.chunk.name === 'index' ? 'index.bundle.js' : '[name]/index.bundle.js'
        }
    },
    plugins: [
        // NB: repeat this instantiation for all separate html files
        new HtmlWebpackPlugin({
            template: './src/page-index/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/page-singer-songwriter/index.html',
            inject: true,
            chunks: ['singer-songwriter'],
            filename: 'singer-songwriter/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    }
})
