const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./common.js');
const PATHS = require('../config/paths');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const config = {
  mode: 'production',
  output: {
    path: PATHS.build,
    filename: '[name].[hash].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.join(PATHS.public, '*.html')),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'js']
        }
      ]
    }),
    new HtmlCriticalWebpackPlugin({
      base: PATHS.build,
      src: path.join(PATHS.build, 'index.html'),
      dest: path.join(PATHS.build, 'index.html'),
      inline: true,
      minify: true,
      extract: false,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false
      }
    }),
    new CopyWebpackPlugin([
      { from: PATHS.public, to: PATHS.build, ignore: ['*.html'] }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  }
};

module.exports = merge(commonConfig, config);
