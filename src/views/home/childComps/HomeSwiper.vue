<template>

  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load = "imageLoad">
      </a>
    </swiper-item>
  </swiper>

</template>

<script>
// swiper文件夹下边index.js的作用：再导入时候，可以将两个组件一起导入
import {Swiper,SwiperItem} from "components/common/swiper"
// import Swiper from '../../components/common/swiper/Swiper.vue';
export default{
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad = true
      }
    }
  }
}
</script>

<style>
</style>
