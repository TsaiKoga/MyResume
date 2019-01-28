const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: __dirname + "/app/main.js",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: 'http://localhost:8080/dist',
    filename: "bundle.js"
  },
  module: {
      rules: [
          {
              test: /(\.jsx|\.js)$/,
              use: {
                  loader: "babel-loader"
              },
              include: /node_modules/
          },
          {
              test: /\.sass$/,
              use: [ 'style-loader', 'css-loader', 'sass-loader' ]
          },
          {
              test: /\.(png|woff|woff2|eot|ttf|svg)$/,
              loader: 'url-loader?limit=100000'
          }
      ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
  ],
  resolve: {
  }
}
