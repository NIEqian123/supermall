<template>
  <div class="tab-bar-item" @click="itemClick">
    <div  v-if="!isActive"> <slot name = "item-icon"></slot></div>
    <div  v-else><slot name = "item-icon-active"></slot></div>
    <div  :style="activeStyle" > <slot name = "item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:"red"
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
 computed:{
   isActive(){
    //  不等于-1 返回true
    //查看当前活跃的路径是否是传入路径
     return this.$route.path.indexOf(this.path) !== -1
   },
   activeStyle(){
     return this.isActive ? {color:this.activeColor}:{}
   }

 },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  /* 对多个flex均等分 */
  flex: 1;
  /* 让每个flex居中 */
  text-align: center;
  height: 49px;
  font-size:14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top:3px;
  vertical-align: middle;
  margin-bottom: 2px;
  /* 去除图片下方的三个像素，使其与文件间间距缩小 */
}

.active{
  color:rgba(0, 183, 255, 0.788)
}
</style>
