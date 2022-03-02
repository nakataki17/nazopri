const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir:"docs",
  publicPath:"./",
  transpileDependencies: true,
  devServer:{
    https:true,
  },
  pages: {
    index:{
      entry:"src/main.js",
      title:"ナゾプリ"
    }
  }

})
