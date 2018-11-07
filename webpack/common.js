const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const locales = require('../config/locales');
const PATHS = require('../config/paths');

const commonConfig = {
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.build], {
      root: PATHS.root,
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      locales: locales.es,
      template: path.join(PATHS.public, './index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [PATHS.src, '../node_modules']
  }
};

module.exports = commonConfig;
