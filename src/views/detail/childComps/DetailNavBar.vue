<template>
<div>
   <!-- 1、导航栏 -->
  <nav-bar class = "nav-bar">
    <div slot = "left" class="back" @click="backClick">
      <img src = "~assets/img/common/back.svg" alt="">
    </div>
    <div slot = "center" class = "title">
      <div v-for = "(item,index) in titles" 
      :key="index"
      class="title-item" 
      :class="{active:index === currentIndex}" 
      @click = "itemClick(index)">
      {{item}}
      </div>
    </div>
    </nav-bar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default{
  name:"DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){
      //返回上一页
      // this.$router.go(-1)
      this.$router.back()
    
    }
  }
}
</script>

<style scoped>

/* .nav-bar{
  position:relative;
  z-index:9;
  background-color: #fff;
} */
/* .nav-bar img {
  margin-top:10px
} */
.title{
  display:flex;
  padding:0 10px;
}

.title-item {
  flex:1;
  
}
.active{
  color:var(--color-high-text)
}
.back{
  /* padding-top:0px */
}
.back img{
  margin-top:12px;

}
</style>
