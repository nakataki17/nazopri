const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir:"docs",
  publicPath:"./",
  transpileDependencies: true,
  devServer:{
    https:true,
    proxy:'https://maker.ifttt.com'
  },
  pages: {
    index:{
      entry:"src/main.js",
      title:"ナゾプリ"
    }
  },
})
