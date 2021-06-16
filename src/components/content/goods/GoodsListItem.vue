<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImage" alt="" @load = "imageLoad"> -->
    <!-- 使用懒加载后 -->
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      // 默认情况下，没有$bus，需要使用原型（main.js)
      // $bus是一个vue实例
      //
      // console.log(this.goodsItem);
      this.$bus.$emit("itemImageLoad");

      ////通过路由判断，在当前页面是否发出某个监听事件。相当于在监听自己的全局事件
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImageLoad')
      // }else if (this.route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick() {
      // console.log("跳转到详情页")
      // 路由跳转时候传递参数方式:动态路由/query
      //动态路由方式添加id，以请求更详细信息
      this.$router.push("/detail/" + this.goodsItem.iid);

      // query方式添加
      // this.$router.push({
      //   path:"/detail",
      //   query:{

      //   }
      // })
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
