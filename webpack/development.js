const merge = require('webpack-merge');
const commonConfig = require('./common');

const config = {
  mode: 'development',
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'eslint-loader'
          },
          {
            loader: 'prettier-loader',
            options: {
              exclude: /node_modules/
            }
          }
        ]
      }
    ]
  }
};

module.exports = merge(commonConfig, config);
