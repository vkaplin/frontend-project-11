var HtmlWabpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWabpackPlugin({
            template: './index.html',
        })
    ]
};