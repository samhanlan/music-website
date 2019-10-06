const { resolve } = require('path')
const BUILD_PATH = resolve(__dirname, 'dist')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        'index': './src/page-index/index.js',
        'singer-songwriter': './src/page-singer-songwriter/index.js',
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
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
