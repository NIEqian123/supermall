<template>
  <div id="app">
    <keep-alive exclude = "Detail">
      <!-- 排除Detail，否则详情页点击进去，一直是同一个iid（图片）的详情页 -->
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
 
</template>

<script>
// 导入后，必将该组件先在下边注册，然后在上边写成标签
import MainTabBar from  "components/content/maintabbar/MainTabBar"
import Icon from "components/content/Icon/Icon"
import SvgIcon from "components/content/Icon/SvgIcon"
// import Home from "views/home/Home"
// import Category from "views/category/Category"
// import Shopcart from "views/shopcart/Shopcart"
// import Profile from "views/profile/Profile"
// import Category from './views/category/Category.vue'
// import Shopcart from './views/shopcart/Shopcart.vue'

export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
    
  },
};
</script>

<style>
  @import "assets/css/base.css";

  #app {
    position: relative;
  }
</style>
