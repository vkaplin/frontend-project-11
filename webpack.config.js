const path = require('path');
const HtmlWabpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    shared: ['axios', 'bootstrap', 'i18next', 'on-change', 'yup'],
  },
  output: {
    path: path.join(path.resolve(), '/public/'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWabpackPlugin({
      template: './src/template.html',
    }),
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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
