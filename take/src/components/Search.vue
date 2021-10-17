<template >
  <div id="app">
        <van-nav-bar @click-left="onClickLeft"   left-arrow  class="Y" title="搜索"/>
     <form action="">
          <van-search v-model="value"
                show-action
                placeholder="请输入商家或美食名称">
             <template #action>
                  <div @click="click">提交</div>
             </template>
          </van-search>
     </form>
        <van-card 
          v-for="i in arr" :key="i.id"
            tag='品牌'
            :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+i.photo"
            @click.native="jumpdetails(i.id)"
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
</template>
<script>
export default {
  props:['bigId'],
   data() {
    return {
      
      arr:[],
      value: '',
    };
  },
  methods:{
     onClickLeft(){
          this.$router.push('/')
        },
       click:function(){
            var that =this
            this.$axios.get('/biz/queryAllShopsInfoByName?name='+this.value).then(function(res){
                console.log(res.data);
                that.arr=res.data
            })
        },
        jumpdetails(id){
          // console.log(id);
          this.$router.push('/list/'+id)
        }
  }
  
}
</script>
<style scoped>
   .zongs{
    margin-top: 10px;
}
.zongs span{
    color: rgb(133, 132, 132);
    font-size: 9px;
}
.van-nav-bar__title {
  color: black;
}
.zongs .goodsScore{
    color: rgb(236, 116, 17);
    font-weight: bold;
    font-size: 10px;
}
</style>


