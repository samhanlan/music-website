const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        hot: false,
        inline: false,
        writeToDisk: true,
        before: function(app, server, compiler) {
            app.get('/', function(req, res) {
                res.sendFile(path.join(__dirname, 'dist/index.html'))
            })
            app.get('/singer-songwriter', function(req, res) {
                res.sendFile(path.join(__dirname, 'dist/singer-songwriter.html'))
            })
            app.get('/audio-engineer', function(req, res) {
                res.sendFile(path.join(__dirname, 'dist/audio-engineer.html'))
            })
            app.get('/freedom-and-such', function(req, res) {
                res.sendFile(path.join(__dirname, 'dist/freedom-and-such.html'))
            })
        }
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080/',
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
            template: './src/page-singer-songwriter/singer-songwriter.html',
            inject: true,
            chunks: ['singer-songwriter'],
            filename: 'singer-songwriter.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/page-freedom-and-such/freedom-and-such.html',
            inject: true,
            chunks: ['freedom-and-such'],
            filename: 'freedom-and-such.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/page-audio-engineer/audio-engineer.html',
            inject: true,
            chunks: ['audio-engineer'],
            filename: 'audio-engineer.html',
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
        ]
    }
})
