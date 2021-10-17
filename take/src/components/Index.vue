<template>
    <div id="app">
<van-nav-bar class="z" @click-left="clickLeft" @click-right="clickRight" title="山东省淄博市张店区..."  >
  <template #right>
    <van-icon name="search" size="18" />
  </template>
   <template #left>
    <span v-if="!isLogined" style="color:#1998FB">去登录</span>
  </template>
</van-nav-bar>
<!-- ================================== -->
    <div class="zxc" >
        <div class="zz" v-for="(item,index) in top" :key="index"  @click="bigCate(item.id)">
            <img :src="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo" alt="" style="width:30px ; height:30px">
            <div style="font-size:14px">{{item.name}}</div>
        </div>
    </div>
    <!-- =============================== -->
     <van-cell-group>
  <van-cell title="附近商家"  />
</van-cell-group>
<!-- ======================================商家 -->
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
<!-- ======================================== -->
   <van-tabbar style="margin-top:60px" v-model="active">
      <van-tabbar-item  v-for='(item,index) in tabs' :key='index' replace :to="'/'+item.name" :icon="item.icon"> 
        {{item.logo}}
      </van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "index",
  data: function () {
    return {
      active:0,
      top: [],
      bottom:[]
    };
  },
  created: function () {
  this.tops() ;
  this.bottoms()

  },
    computed:{
    ...mapState(['tabs','isLogined'])
  },
  methods:{
    //头部数据
    tops(){
        var that = this;
        this.$axios.post("/biz/queryBigCategory").then(function (res) {
          // console.log(res.data);
          that.top = res.data;
        })
    },
    //底部数据
    bottoms(){
      var that = this;
      this.$axios.post("/biz/queryAllShopsInfo").then(function (res) {
        // console.log(res.data);
        that.bottom = res.data;
      });
    },
    clickLeft(){
      this.$router.push('/login')
    },
    //点击右侧搜索按钮
    clickRight(){
      
      this.$router.push('/Search')
    },
    //商家详细信息
    chufa(id){
      // console.log(id)
      this.$router.push('/list/'+id)
    },
    //点击大分类跳转
    bigCate(uid){
      this.$router.push('/new/'+uid)

    }
  }
};
</script>
<style >
.zz {
  width: 23%;
  margin: 5px 0;
  display: inline-block;
  height: 70px;
  background-color: #fff;
}
.zxc {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
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