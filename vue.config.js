const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //语法检查
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", "css"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
