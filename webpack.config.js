const webpack = require('webpack');

module.exports = {
  entry: './app/app.js',
  output: {path: __dirname + '/output', filename: 'bundle.js' },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
};