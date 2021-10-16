<template>
    <div id="app">
       
       <van-nav-bar @click-left="onClickLeft"   left-arrow   title="索引分类"/>
        <div  style="margin-bottom:60px">
<van-card 
 v-for="i in bottom" :key="i.id"
 @click.native="chufa(i.id)"
  tag='品牌'
  :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+i.photo"
  
>
<template #title>
    <span  style="font-weight:bold; font-size:14px">{{i.name}}</span>
  </template>
  <template #desc>
    <div class="zongs"> 
         <span class="goodsScore">{{i.goodsScore}}分</span>/ <span class="distance">月售{{i.distance}}单</span>
         <span style="float:right">{{i.deliveryTime}}分钟   {{i.sales}}米</span>
         </div>
    <div class="zongs">  <span >起送￥{{i.minPrice}}</span>/ <span class="distance">配送费约{{i.goodsScore}}</span></div>
 
  </template>
  <template #footer>
  <van-tag plain type="primary">牛牛派送</van-tag>
    <van-tag plain type="primary">限时达</van-tag>
  </template>
</van-card>
</div>

    </div>
</template>
<script>
export default {
   props:['bigId'] ,
   data() {
    return {
      bottom:[]
    };
  },
    created:function(){
this.bottoms()
    },
  methods:{
       onClickLeft(){
          this.$router.push('/')
        },
        bottoms(){
            console.log(this.bigId)
            var that = this;
            this.$axios.get("/biz/queryShopsByBigId?bigcategoryId="+this.bigId).then(function (res) {
        console.log(res.data);
        that.bottom = res.data;
      });
    },
     //商家详细信息
    chufa(id){
      // console.log(id)
      this.$router.push('/list/'+id)
    },



  }
}
</script>

<style scoped>

</style>