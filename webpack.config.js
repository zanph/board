/*not used yet, but will be for deployment and testing*/
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";
const isTest = NODE_ENV === "test";
/******************************************************/

const path = require('path');
const webpack = require('webpack');

const join = path.join; 
const resolve = path.resolve;

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');

module.exports = {
  entry: './src/app.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0'].map(require.resolve)
        }
      },
      {
        test: /\.module\.css$/,
        include: [src],
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      // for css in node_modules
      { 
        test: /\.css$/,
        include: [modules], 
        loader: "style-loader!css-loader" 
      },
      //for non-css module support
      {
        test: /[^module]\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      //css module support
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  postcss : [
    require('precss')({}),
    require('autoprefixer')({}),
    require('cssnano')({})
  ],

  resolve: {
    root: [src, modules],
    alias: {
      css: join(src, 'styles'),
      containers: join(src, 'containers'),
      components: join(src, 'components'),
      utils: join(src, 'utils'),
      styles: join(src, 'styles')
    }
  }
};
