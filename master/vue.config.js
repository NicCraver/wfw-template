const { port } = require("./package");
const webpack = require('webpack');
const { getIpAddress } = require('anx-core');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        $HOST: JSON.stringify(getIpAddress())
      })
    ]
  },

  // publicPath: './',
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    proxy: {
      "/api": {
        target: "http://192.168.199.243:8762",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/follow-up": {
        target: "http://192.168.199.243:8761",
        changeOrigin: true,
        pathRewrite: {
          "^/follow-up": ""
        }
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/css/variables/variables.scss";`,
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
