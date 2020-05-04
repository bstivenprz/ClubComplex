const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

module.exports = [{
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  stats: 'minimal',
  devServer: {
    hot: true,
    host: process.env.HOST || 'localhost',
    port: process.env.WEB_PORT || 8080,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'production'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.(png|svg|jpg|git)$/,
        use: [ 'file-loader' ],
      },
      {
        test: /\.css$/i,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
    new Dotenv({ path: path.resolve(__dirname, '../config', '.env') })
  ]
}];