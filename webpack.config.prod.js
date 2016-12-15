const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/pixel_tracker.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  },
  plugins:[
   new webpack.DefinePlugin({
     'process.env':{
       'NODE_ENV': JSON.stringify('production')
     }
   }),
   new webpack.optimize.UglifyJsPlugin({
     compress:{
       warnings: true
     }
   })
 ]
};
