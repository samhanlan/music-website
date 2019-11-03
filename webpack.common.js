const { resolve } = require('path')
const BUILD_PATH = resolve(__dirname, 'dist')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        'index': './src/page-index/index.js',
        'singer-songwriter': './src/page-singer-songwriter/singer-songwriter.js',
        'freedom-and-such': './src/page-freedom-and-such/freedom-and-such.js',
        'audio-engineer': './src/page-audio-engineer/audio-engineer.js',
    },
    output: {
        path: BUILD_PATH,
        filename: chunkData => chunkData.chunk.name === 'index' ? '[name].js' : '[name]/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['link:href', 'img:src', 'image:href', 'audio:src'],
                    }
                },
            },
            {
                test: /\.(jpg|jpeg|png|gif|ico|mp3)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
