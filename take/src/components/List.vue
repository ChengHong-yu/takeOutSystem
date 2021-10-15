<template>
    <div>
        <!-- 头部标题信息 -->
        <div class='headDiv'>
            <!-- 标题 -->
            <van-nav-bar :title="shop.name" left-arrow @click-left="onClickLeft"/>
            <p>
                <span>{{shop.score}}</span>
                <span>月售{{shop.sales}}单</span>
                <span>硅谷专送</span>
                <span>约{{shop.deliveryTime}}分钟</span>
                <span>距离{{shop.distance}}m</span>
            </p>
            <p>新用户下单立减17元（不与其他活动同时使用）<span>优惠</span></p>
            <hr>
        </div>
        <!-- tab切换 -->
        <van-tabs>
            <van-tab v-for="(item,index) in tab22" :title="item.name" :key='index'>
                <div v-if='index==0'>
                    <!-- 分类 -->
                    <van-tree-select :items="fenLei" height="100%" :main-active-index.sync="active">
                        <template #content>
                            <div v-for="a in active" :key="a"></div>
                            <div v-if='active===6'>fsdfdsfdsfdsf</div>
                        </template>
                    </van-tree-select>
                    <div>购物车</div>
                </div>
                <div v-if='index==1'>评价</div>
                <div v-if='index==2'>商家</div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:['id'],
   data:function(){
       return{
           shop:{},
           fenLei:[],
           active:0,
           activeIndex:0
       }
   },
   computed:{
       ...mapState(['tab22'])
   },
   created:function(){
       this.shujv(this.id);
       this.fenlei(this.id);
       
   }, 
   methods:{
       //商家基本信息数据
       shujv(id){
           var that=this;
           this.$axios.get('/biz//queryInfoByShopId?shopId='+id).then(function(res){
            //    console.log(res.data);
               that.shop=res.data;
           })
       },
       onClickLeft(){
           this.$router.go(-1);
       },
        //分类
        fenlei(id){
            var that=this;
            var he=[]
           this.$axios.get("/biz/queryFoodCategory?id="+id).then(function(res){
               console.log(res.data.length);
                for(let i=0;i<res.data.length;i++){
                    console.log()
                    var z={text:res.data[i].name}
                    he.push(z)
                }
                // console.log(he);
               that.fenLei=he;

           })
        }  
   }
}
</script>
<style scoped>
.headDiv{
    position: relative;
}
.headDiv>p{
   text-align: center;
}
</style>