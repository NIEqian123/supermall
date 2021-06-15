<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div v-if="cartList.length">
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :product="item"
        />
      </div>
      <div v-else class="empty-cart">
        <p>购物车居然是空的（°ο°）~ @</p>
        <p>再忙，也记得买点什么犒赏自己</p>
        <p @click="goHome">去逛逛</p>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    // console.log("----------")
    this.$refs.scroll.refresh();
  },
  methods: {
    goHome() {
      this.$router.replace("/home");
    }
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}

.content {
  height: 100%;
  overflow: hidden;
}
.empty-cart {
  padding-top: 50px;
  text-align: center;
}
.empty-cart p:nth-child(3) {
  margin: 20px auto;
  width: 80px;
  padding: 4px 12px;
  background: #f3f3f3;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
