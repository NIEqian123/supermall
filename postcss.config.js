module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度，对应是设计稿的宽度（iphone6设计稿:750*1334)
      viewportHight:667,//视窗的高度，对应是设计稿的高度（也可以不配置）
      unitPrecision:5,//指定“px”转换为视窗单位值得小数位数（很多时候无法整除）
      viewportUnit:"vw",//指定高度转换成的视窗单位，建议使用“vw”
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],
//指定不需要转换的类，后边再讲  如果后期需要指定新类，可直接将新类名添加到该数组中，或给新类名后边加上ignore（推荐
      minPixelValue:1,//小于或等于“1px”不转换为视窗单位
      mediaQuery:false,//允许在媒体查询中转换“px”
      exclude:[/TabBar/],  //必须是正则，匹配文件

    }
  }
}

//1在js中使用正则： /正则相关规则/
//2exclude中存放的元素必须是正则表达式
//3按照排除的文件写对应的正则
//正则的规则：
/* 1）^abc:表示匹配的内容，必须以abc开头
   2）abc$:表示匹配的内容必须以abc结尾
 */