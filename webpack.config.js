let path = require('path');
let HtmlWabpackPlugin = require('html-webpack-plugin');

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
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: function () {
                return [
                  require('autoprefixer'),
                ];
              },
            },
          },
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: 'vendors',
  //           chunks: 'all',
  //       },
  //     },
  //   },
  // },
};
