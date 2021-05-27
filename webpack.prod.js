const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require("./webpack.common");
const webpack = require("webpack");

const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const safeEnvKeys = Object.keys(env).filter(key => {
  return key.startsWith('REACT_APP_');
});

const envs = safeEnvKeys.reduce((acum, next) => {
  acum[`process.env.${next}`] = JSON.stringify(env[next]);

  return acum;
}, {});

const index = new HtmlWebpackPlugin({
  template: './src/template/index.pug',
  filename: 'index.html',
  chunks: ['index']
});

module.exports = merge(common, {
  mode: 'production',
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(envs),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './public',
          noErrorOnMissing: true
        }
      ]
    }),
    index
  ]
});