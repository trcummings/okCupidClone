const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: "./frontend/PerfectPair.js",
  output: {
    path: path.join(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: "[resourcePath]",
    devtoolFallbackModuleFilenameTemplate: "[resourcePath]?[hash]",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-maps",
};
