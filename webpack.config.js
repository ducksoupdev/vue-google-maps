var webpack = require('webpack');
var path = require('path');
var clone = require('lodash.clone');

var baseConfig = {
  entry: [
    path.resolve('./src/main.js')
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=[name].[ext]?[hash]'
      }
    ],
  }
};

/**
 * Web config uses a global Vue and Lodash object.
 * */
var webConfig = clone(baseConfig);
webConfig.externals = {
  vue: 'Vue',
  'marker-clusterer-plus': 'MarkerClusterer'
};
webConfig.output = {
	path: './dist',
    filename: "vue-google-maps.js",
    library: ["VueGoogleMap"],
    libraryTarget: "umd"
};

module.exports = [
    webConfig,
];

if (process.env.NODE_ENV === 'production') {
  console.log('THIS IS PROD');
  for (var i=0; i<module.exports.length; i++) {
      module.exports[i].plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
      ]
  }
} else {
  for (var i=0; i<module.exports.length; i++) {
    module.exports[i].devtool = 'source-map'
  }
}
