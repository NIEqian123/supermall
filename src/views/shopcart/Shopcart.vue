<template>
<div class = "cart">
  <!-- 导航 -->
  <nav-bar class="nav-bar">
    <div slot ="center">购物车({{length}})</div>
  </nav-bar>
  <!-- 商品列表 -->
  
  <cart-list/>
  <!-- 底部汇总 -->
  <cart-bottom-bar/>

</div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"
import {mapGetters} from "vuex"
export default{
 
  name:"Shopcart",
  components: { 
    NavBar ,
    CartList,
    CartBottomBar
    },
  computed:{
    
    // 不使用getters
    // cartLength(){
    //   return this.$store.getters.cartLength
    // },

    //传统使用getters
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
    
    //将getters映射成计算属性
    //一种语法
    // ...mapGetters(['cartLength']),
    //另一种语法
    ...mapGetters({
      length:'cartLength',
      // list:'cartList'
    })

  }
}

</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color:#fff;
  /* 加粗 */
  font-weight:700;
}
</style>
