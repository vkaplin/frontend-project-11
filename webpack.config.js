var HtmlWabpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWabpackPlugin({
            template: './src/template.html',
        })
    ],
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        liveReload: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader'],
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions:{
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    }
                }, {
                    loader: 'sass-loader',
                }]
            },
        ]
    },

};