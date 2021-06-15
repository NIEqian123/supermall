<template>
  <div id="detail" class = "wrapper">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 属性 topImages ；传入值top-images-->
      <!-- <ul>
        <li v-for ="item in $store.state.cartList">
          {{item}}
        </li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />

    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native ="backTop"  v-show="isShowBackTop" />
    <!-- 普通toast封装，导入-注册-使用，太麻烦； -->
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast"
// import BackTop from "components/content/backTop/BackTop"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import {debounce} from "common/utils";

import { itemListenerMixin,backTopMixin} from "common/mixin";
import { mapActions } from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex:0,
      isShowBackTop:false,
      // message:'',
      // show:false
    };
  },
  created() {
    // console.log(this.$route.params);
    //1、保存传入的iid
    this.iid = this.$route.params.iid;

    //2、根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res)
      //获取顶部的轮播图片数据 等号右边是从请求过来的数据中获取的(查看vue)
      const data = res.result;

      this.topImages = res.result.itemInfo.topImages;

      //3、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //4\创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //5、保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //6获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //7获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 第一次获取。值不对，是因为$refs.params.$el还没有渲染
      // this.themeTopYs=[]
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs)

      //第二次获取，值不对，图片还没加载
      //不进行nextTick可能拿不到值，因为有可能还没渲染好
      //nextTick是在DOM渲染结束才执行,但是图片可能还没加载完（目前获取的offsetTop是不包含图片

      // this.$nextTick(()=> {
      //    this.themeTopYs=[]
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs)
      // })
    });
     //给getThemeTopY赋值
    this.getThemeTopY = debounce(()=>{
    this.themeTopYs=[]
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    this.themeTopYs.push(Number.MAX_VALUE);
    // console.log(this.themeTopYs)
    })

    //3请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  mounted() {
    // let newRefresh = debounce(this.$refs.scroll.refresh,100)
    // //对监听事件进行保存
    // this.itemImgListener = ()=>{
    //   newRefresh()
    // }
    // this.$bus.$on("itemImgLoad",this.itemImgListener)
  },

  destroyed() {
    //某个页面离开时，取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    // 将action中的addCart方法映射到,成为这里的函数
    ...mapActions(['addCart']),
    // ...mapActions({
    //   add:'addCart'   //对象形式，将方法名重新定义，可以后边直接调用this.add
    // })
    
    //  backClick(){
    //   // console.log("回到顶部");
    //   // this.$refs.scroll.scroll.scrollTo(0,0,1000)
    //   // 在500毫秒内，回到顶部，时间越长，返回的越缓慢
    //   //  this.$refs.scroll拿到scroll组件对象
    //   //this.$refs.scroll.scroll拿到scroll组件对象中的scroll属性，给他调用方法

    //   // 将scrollTo方法封装后
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    imageLoad() {
      this.$refs.scroll.refresh()
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position){
      //获取y值
      const positionY = -position.y;

      // 2、positionY与主题中值进行对比
      //positionY Z在0与7938之间，index=0
      // positionY在7938和9120之间，index=1
      // positionY在9120和9452之间，index=2
      // positionY大于等于9452，index=3
      // console.log(position)
      // for(let i in this.themeTopYs){
      //   // console.log(i)   i是索引,但是i是字符串形式，会在真正的索引后边加1，成为11 21 31
      //   if(positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i+1)]){
      //     console.log(i)
      //   }
      // }


   //普通做法
      // let length = this.themeTopYs.length
      // for(let i=0;i<length;i++){
      
      //   if(this.currentIndex !==i && ((i<length-1 && positionY >=this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
      //   (i===length-1 && positionY>this.themeTopYs[i]))){
      //     // console.log(i);
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex)
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

  //hack做法
     let length = this.themeTopYs.length
     for (let i=0;i<length-1;i++){
       if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
         this.currentIndex = i;
         this.$refs.nav.currentIndex = this.currentIndex
       }

     }
     //是否显示回到顶部
      //  this.isShowBackTop = (-position.y) > BACK_POSITION
      this.listenShowBackTop(position)
    },
    addToCart(){
      // console.log("------")
      //1获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid; 

      //2将商品加到购物车（1、promise 2、mapActions）
      // this.$store.commit('addCart',product)

       //调用vuex中actions的addCart方法
      // this.$store.dispatch("addCart",product).then(res => {
      //   // 如果在vuex中做了某些操作，想让外界知道，就需要用到promise（action.js中）
      // console.log(res);
      // })

      //经过mapAtions映射后，调用自己的addCart方法
      this.addCart(product).then(res => {
        //普通的toast封装方法
        // this.show = true;
        // this.message=res;
        // setTimeout(() => {
        //   this.show=false;
        //   this.message=''
        // },1500)

        //最终简便封装
        this.$toast.show(res,2000);
        // console.log(this.$toast)
      })

    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 添加背景颜色，将最下边状态栏（购物车，分类，我的，首页）覆盖 */
  height: 100vh;
}

/* .detail-nav{
  position:relative;
  z-index:9;
  background-color: #fff;
} */

.content {
  /* margin-top:44px; */
  overflow: hidden;
  height: calc(100% - 44px);
  background-color: #fff;
}
</style>
