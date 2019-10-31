const { resolve } = require('path')
const BUILD_PATH = resolve(__dirname, 'dist')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        'index': './src/page-index/index.js',
        'singer-songwriter': './src/page-singer-songwriter/singer-songwriter.js',
        'freedom-and-such': './src/page-freedom-and-such/freedom-and-such.js',
        'audio-engineer': './src/page-audio-engineer/audio-engineer.js',
    },
    output: {
        path: BUILD_PATH,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ]
            },
            {
                test: /\.(jpg|jpeg|png|webp|gif|mp3)$/,
                use: [
                    'file-loader',
                ]   
            },
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './src/favicon.ico', to: 'favicon.ico' },
        ]),
        new CleanWebpackPlugin()
    ]
}
