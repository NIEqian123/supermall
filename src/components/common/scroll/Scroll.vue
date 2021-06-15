<template>
<!-- ref一般绑定到子组件  通过this.$refs.refname获取的是一个组件对象
    ref绑定在普通元素上，获取的就是一个元素对象
-->
<div class = "wrapper" ref ="wrapper">
  <div class = "content">
      <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    //1\创建BScroll对象
   this.scroll = new BScroll(this.$refs.wrapper,{
     click:true,
     probeType:this.probeType,
     pullUpLoad:this.pullUpLoad
    //  上边属性，可以在需要滚动的具体组件的scroll标签中绑定以达到其效果

  })

  //2监听滚动的位置
  this.scroll.on('scroll',(position) => {
    // console.log(position)
    // 自定义发送事件，在具体父组件的scroll标签中监听事件
    this.$emit('scroll',position);

  })
   this.scroll.refresh()
  //3监听上拉事件
  this.scroll.on('pullingUp',()=>{
    // console.log("上拉加载更多");
    // setTimeout(()=>{
    //   this.scroll.finishPullUp()
    // },2000)
    this.$emit('pullingUp')
  })

  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
      //给scroll的scroll进行finishPullUp方法
    },
    refresh(){
      // console.log(",,,,,,,,")
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      // 如果this.scroll有值就返回y，没有值就返回0
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
