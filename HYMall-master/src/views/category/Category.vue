<template>
<div id="category">
  <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
  <div class="content">
    <tab-menu :categories="categories"
              @selectItem ="selectItem"></tab-menu>
    <scroll id="tab-content" :data="[categoryData]">
      <div>
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-control :titles="['综合','新品','销量']"
                      ></tab-control>
        <tab-content-detail :category-detail="getCategoryDetail"></tab-content-detail>
      </div>


    </scroll>



  </div>
</div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from 'content/tabControl/TabControl'
  import Scroll from 'common/scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";

export default {
  name: "Category",
  components:{
    NavBar,
    Scroll,
    TabMenu,
    TabControl,
    TabContentCategory,
    TabContentDetail
  },
  mixins: [tabControlMixin],
  data(){
    return{
       categories:[],
       categoryData:{},
       currentIndex:-1

    }
  },
  created(){
    // 1、请求分类数据
    this._getCatrgory()

  },
  computed:{
    showSubcategory(){
      if(this.currentndex === -1)return{}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      if(this.currentIndex === -1) return[]
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }


  },

  methods:{
      _getCatrgory(){
        getCategory().then(res=>{
          //1\获取分类数据
          this.categories = res.data.category.list

          //2初始化每个类别的子数据
          for(let i=0;i<this.categories.length;i++){
            this.categoryData[i]={
              subcategories:{},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //3请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index){
        this.currentIndex=index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res=>{
          // console.log(res)
          this.categoryData[index].subcategories = res.data
          this.categoryData ={...this.categoryData}
       　 this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
       })

      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallKey = this.categories[this.currentIndex].miniWallKey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallKey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },


      //事件响应相关的方法
      selectItem(index){
        // this._get
        // console.log("0000000")

        this._getSubcategories(index)
      }
  }
}
</script>

<style scoped>
#category{
  height:100vh;
}
.category-nav{
  background-color: var(--color-tint);
  color:#fff;
  font-weight:700
}

.content{
  position:absolute;
  left:0;
  right:0;
  top:44px;
  bottom:49px;
  display:flex
}

#tab-content{
  height: 100%;
  flex:1
}
</style>
