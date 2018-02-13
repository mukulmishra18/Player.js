var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/player.js',
  output: {
    path: path.resolve('dist'),
    filename: 'player.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loaders: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.es6']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/external' }
    ])
  ]
};
