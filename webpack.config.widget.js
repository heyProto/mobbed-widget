const webpack = require('webpack');
const minifier = require('minifier');
const input = './src/css/styles.css';
const options = {
  output: "./dist/the-lynched-widget.min.css"
}
minifier.minify(input, options);

module.exports = {
  entry: {
    app: [ './src/js/Widget.js' ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './dist/the-lynched-widget.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },
  devServer: {
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets:['react']
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
