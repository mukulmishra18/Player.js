var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/player.js',
  output: {
    path: path.resolve('dist'),
    filename: 'player.js'
  },
  module: {
    loaders: [
      {
        test: /src\/**\.js$/,
        loaders: 'babel-loader'
      }
    ]
  }
};
