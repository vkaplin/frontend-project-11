var HtmlWabpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/',
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWabpackPlugin({
            template: './src/template.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use:['styel-loader', 'css-loader'],
            }
        ]
    },
};