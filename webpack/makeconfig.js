/* @flow weak */

"use strict"

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var NotifyPlugin = require('./notifyplugin')
var path = require('path')
var webpack = require('webpack')

var loaders = {
  'css': 'css-loader',
  'less': 'css-loader!less-loader',
  'scss|sass': 'css-loader!sass-loader',
  'styl': 'css-loader!stylus-loader'
}

module.exports = function(isDevelopment) {

  function stylesLoaders() {
    return Object.keys(loaders).map(function(ext) {
      var loader = isDevelopment ? 'style-loader!' + loaders[ext] :
        ExtractTextPlugin.extract('style-loader', loaders[ext])
      return {
        loader: loader,
        test: new RegExp('\\.(' + ext + ')$')
      }
    })
  }

  var config = {
    cache: isDevelopment,
    debug: isDevelopment,
    // This is not as dirty as it looks. It just generates source maps without
    // being crazy slow. http://webpack.github.io/docs/configuration.html#devtool
    devtool: isDevelopment ? 'eval' : '',
    entry: isDevelopment ? [
      'webpack-dev-server/client?http://localhost:8888',
      // Why only-dev-server instead of dev-server:
      // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
      'webpack/hot/only-dev-server',
      './src/client/main.js',
      'bootstrap-webpack'
    ] : [
      './src/client/main.js',
      'bootstrap-webpack'
    ],
    module: {
      loaders: [

      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },

      // ESTE basic loaders
      {
        exclude: /node_modules/,
        loaders: isDevelopment ? [
          'react-hot', 'babel-loader'
        ] : [
          'babel-loader'
        ],
        test: /\.jsx?$/
      }].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: path.join(__dirname, '/build/'),
      filename: 'app.js',
      publicPath: 'http://localhost:8888/build/'
    } : {
      path: 'build/',
      filename: 'app.js'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' :
              'production')
          }
        })
      ]
      if (isDevelopment)
        plugins.push(
          NotifyPlugin,
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        )
      else
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        )
      return plugins
    })(),
    resolve: {
      // To allow require('file') instead of require('file.jsx')
      extensions: ['', '.js', '.jsx', '.json']
    },
  }

  return config

}
