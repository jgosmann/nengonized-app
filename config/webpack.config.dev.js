const path = require('path')
const resolve = require('resolve');
const webpack = require('webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const getClientEnvironment = require('./env');
const paths = require('./paths');


// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: 'development',

  entry: [
    'react-dev-utils/webpackHotDevClient',
    paths.appIndexJs,
  ],

  output: {
    filename: 'bundle.js',
    publicPath: publicPath,
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: paths.appNodeModules,
        use: ['babel-loader'],
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(woff|woff2)$/,
        use: ['url-loader'],
      }, {
        test: /\.(ttf|eot|svg)$/,
        use: ['file-loader'],
      }
    ]
  },

  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ]
}
