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
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader'],
            }
        ]
    },
};