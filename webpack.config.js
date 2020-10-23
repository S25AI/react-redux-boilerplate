const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ProgressPlugin } = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';
const withLinter = process.argv.slice(-1)[0] === 'lint';

const commonConfig = {
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: './app',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.[hash:8].js",
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: isDev}
          }
        ]
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({filename: 'style.css'}),
    new HtmlWebpackPlugin({template: 'index.html'})
  ],

  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    hot: true,

    watchOptions: {
      aggregateTimeout: 300,
      ignore: /node_modules/,
      poll: 100
    }
  }
};

if (isDev) {
  commonConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

if (withLinter) {
  commonConfig.module.rules.push({
    enforce: "pre",
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  });
}

module.exports = env => commonConfig;
