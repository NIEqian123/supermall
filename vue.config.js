module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        // @是src的别名
        "assets":"@/assets",
        "common":"@/common",
        "components":"@/components",
        "network":"@/network",
        "views":"@/views",
      }
    }
  }
}