const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATH = path.resolve(__dirname, 'dist-dev');

module.exports = {
  mode: 'development',
  output: {
    path: PATH,
    filename: 'main.bundle.js'
  },
  devServer: {
    contentBase: PATH,
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: false,
          minimize: true,
        },
      },
      {
        test: /styles\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.css$/i,
        exclude: /styles\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|svg|git)$/i,
        loader: 'file-loader',
        options: {

          esModule: false,
        }
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin({}),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets/',
        }
      ]
    })
  ]
};
