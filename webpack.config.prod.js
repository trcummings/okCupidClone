var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./frontend/PerfectPair.js",
  output: {
    path: path.join(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: "[resourcePath]",
    devtoolFallbackModuleFilenameTemplate: "[resourcePath]?[hash]",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["react"],
        },
      },
    ],
  },
  devtool: "source-maps",
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
};
