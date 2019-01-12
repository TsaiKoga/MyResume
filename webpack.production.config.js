const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: __dirname + "/app/main.js",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: path.join(__dirname, "/dist/"), // 打包后，访问路径因为 path 添加了 dist，所以css，html对URL资源的访问也需要加上这个目录前缀
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
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
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
