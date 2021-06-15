<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1"
                :titles="['流行', '新款', '精选']"
                @tabClick="tabClick"
                class = "tab-control" v-show="isTabFixed"/>
                <!-- 上边的tab-control用于占位i，默认不显示，当下边的tab-control滑动至当前位置，该tab-control显示
                     且下边的tab-control是在better-scroll滚动，该tabControl未使用betterscroll
                 -->

    <scroll class="content" 
            ref = "scroll" 
            :probe-type="3" 
            @scroll ="contentScroll"
            :pull-up-load ="true"
            @pullingUp = "loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl2"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <!-- <goods-list :goods="goods[currentType].list"/>      与下边代码效果一致 -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 组件不能直接监听点击事件,必须加上native(监听组件根元素的原生事件) -->
     <!-- <back-top @click ="backClick"/> --> 
     <back-top @click.native ="backClick"  v-show="isShowBackTop" />
    


  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"


// 么有用expoert default 导出的，再导入时候都要加大括号
import { getHomeMultidata, getHomeGoods } from "network/home";
// import {debounce} from "common/utils"

import {itemListenerMixin} from "common/mixin"
import {BACK_POSITION} from "common/const"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result:null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell:{ page: 0, list: [] },
      },
      currentType: "pop",
      // 默认当前类型是pop
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,

    };
  },
 mixins:[itemListenerMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed(){
    console.log('home destroyed')
  },
  activated(){
    // console.log("activated")
    //重新回到首页时，直接是在保存的位置信息哪里
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){    
    //从首页离开时，会保存一个位置信息
    // this.saveY = this.$refs.scroll.scroll.y

    // 将获取y值得方法进行封装，就这样保存
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");



  },
  mounted(){
    //1图片加载完成的事件监听
    // const newRefresh =debounce(this.$refs.scroll.refresh)
    // // 局部变量refresh不会销毁。，因为下边是一个闭包
    //     //3、监听item中图片加载完成

    //     // 对监听的事件进行保存
    //  this.itemImgListener = () => {
    //   newRefresh()
    //   }
    //  this.$bus.$on('itemImageLoad',this.itemImgListener)

    //2获取tabControl的offsetTop
    //this.$refs.tabControl拿到的是组件，组件中没有offsetTop属性，需要找到组件中的元素
    //所有组件都有一个属性$el:用于获取组件中的元素
    //  this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop

  },
  methods: {
    //事件监听相关方法

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个tabcontrol的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      // console.log("回到顶部");
      // this.$refs.scroll.scroll.scrollTo(0,0,1000)
      // 在500毫秒内，回到顶部，时间越长，返回的越缓慢
      //  this.$refs.scroll拿到scroll组件对象
      //this.$refs.scroll.scroll拿到scroll组件对象中的scroll属性，给他调用方法

      // 将scrollTo方法封装后
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // console.log(position)
      // position.y为负数
            //1判断BackTop是否显示
      this.isShowBackTop = (-position.y) > BACK_POSITION

       //2决定tabControl是否吸顶（position：fixed）
       this.isTabFixed =  (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log("上拉加载更多")
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){

     
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //函数调用，会压入函数栈（保存调用过程中的所有变量）
        //函数调用结束，弹出函数栈（释放函数中所有变量）
        // console.log(res);
        //内存：res指向data，当函数调用结束，会将res回收，此时没有变量指向data，所以data也会被回收

        // 上边then函数执行结束。res没有意义了，所以需要在then函数之前使用data创建空间将res内容进行保存
        // this.result = res;
        //相当于把res的内存地址赋值给result，让result也指向data，
        //即使函数调用结束，res被回收，但是result仍然指向data，所以data不会被回收释放
        this.banners = res.data.banner.list;

        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        //  ...相当于解构，把res.data.list中的元素解析出来，依次传递到goods[type].list中去
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
        //通过this.$refs.scroll拿到scroll，调用finishPullUp方法
      });
    },
  },
};
</script>

<style scoped>
/* scoped表示作用域，表示只在当前文件下的class起效果 */
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 以下属性是在使用浏览器原生滚动时候，为了让导航不跟随一起滚动
  但是目前使用的是better-scroll的局部滚动，所以该属性不起作用，就没有用了 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position:relative;
    z-index:9
  }

  /* .fixed{
    position:fixed;
    left:0;
    right:0;
    top:44px

  } */


/* .content{
  height:calc(100%-93px);
  overflow: hidden;
  margin-top:44px 
  } */
 
</style>
