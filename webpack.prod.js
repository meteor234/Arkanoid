const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const webpackMerge = require("webpack-merge")
const commonConfig = require("./webpack.common")

const prdConfig = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "~",
      name: true,
    },
  },
  plugins: [new CleanWebpackPlugin()],
}

module.exports = webpackMerge(commonConfig, prdConfig)
