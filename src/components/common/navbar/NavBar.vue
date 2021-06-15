<template>
<div class="nav-bar">
  <!-- 直接对插槽添加属性进行布局，会出现问题，我们采用<div></div>包装<slot></slot> 
    具名插槽。便于指定替换的是哪一个插槽
  -->
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>

</div>
</template>

<script>
export default {
  name:"NavBar"
}

</script>

<style  scoped>
.nav-bar {
  display:flex;
  height:44px;
  line-height:44px;  
  /* line-height 可以保证导航栏内容上下居中 */
  text-align:center;
  box-shadow:0 1px 1px rgba(100,100,100,0.1)


}

.left, .right {
  width:60px;
  /* background-color:red; */
}

.center {
  flex:1;
  /* 将剩余宽度部分全部占据 */
  /* background-color:blue; */
}

</style>
