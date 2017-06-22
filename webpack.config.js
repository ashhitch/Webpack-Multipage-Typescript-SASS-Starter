var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// the path(s) that should be cleaned
var pathsToClean = [
  'dist'
]

// the clean options to use
var cleanOptions = {
  exclude:  [],
  verbose:  true,
  dry:      false
}


module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    hot: true
  },

  // Object as multipage site not SPA
  entry: {
    styles: './src/styles/main.scss',
    pageA: ['./src/scripts/shared.ts', './src/scripts/pageA.ts'],
    pageB: ['./src/scripts/shared.ts', './src/scripts/pageB.ts'],
  },

  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader','postcss-loader'])
      }
    ],
    //Loaders work on invidual files
   
  },
  output: {
    path: path.join(__dirname, 'dist'), //Where to store file, use publichPath if need to update path for production e.g For CDN
    filename: 'scripts/[name].bundle.js',
    chunkFilename: 'scripts/[id].chunk.js'
  },

  //Work at bundle or chunk level  and usally at the end of of bundling
  plugins: [
    new DashboardPlugin(),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'scripts/common.js',
      name: 'common'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ 
      filename: 'styles/[name].bundle.css',
      allChunks: true,
    }),
  ]
};