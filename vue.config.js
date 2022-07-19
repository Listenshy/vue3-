const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8001,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // }
  },
  lintOnSave: false
})