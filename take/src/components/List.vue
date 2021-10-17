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
                    <van-tree-select :items="fenLei" height="100%" :main-active-index.sync="active" @click-nav='aa' @click.native='dtl'>
                        <template #content>
                            <ul>
                                <li v-for='(s,i) in shops' :key='i'>
                                    <a href="">{{s.name}}</a>
                                </li>
                            </ul>
                        </template>
                    </van-tree-select>
                    <div>购物车</div>
                </div>
                <!-- 评价 -->
                <div v-if='index==1'>评价</div>
                <!-- 商家/优惠 -->
                <div v-if='index==2'>
                    <van-cell  size="large"  >
                         <template #title>
                              <span style="font-weight:bold">配送信息</span>
                            </template>
                                 <template #label>
                              <van-tag type="success">牛牛专送</van-tag> 
                              <span style="font-size:9px">由商家提供配送，约{{shop.deliveryTime}}分钟送达，距离{{shop.distance}}米</span>
                              <div style="margin-top:10px;font-size:9px">配送费{{shop.transportationPrice}}元</div>
                            </template>
                            
                    </van-cell>
                        <div class="van-hairline--top"></div>
                        <van-cell-group>   
                        <van-cell  border >
                           
                            <template #default>
                                <h4>活动与服务</h4>
                                <div v-for="z in youhuis" :key="z.shopId">
                                <div v-if="z.tag==='首单'"  >
                                 <van-tag type="success">首单</van-tag> 
                                <span>{{z.contents}}</span>
                                </div>
                                <div v-if="z.tag==='特价'">
                                 <van-tag type="warning">特价</van-tag> 
                                <span>{{z.contents}}</span>
                                </div>
                                </div>
                            </template>
                        </van-cell>
                        </van-cell-group>
                    </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    props:['id'],
   data:function(){
       return{
           shop:{},//商家基本信息
           fenLei:[],//商品分类
           active:0,

           i:2,
        //    activeIndex:0,
           //优惠
           youhuis:[],
           shops:[]
       }
   },
   computed:{
       ...mapState(['tab22','tid'])
   },
   created:function(){
       this.shujv(this.id);
       this.fenlei(this.id);
       this.youhui(this.id);
       
   }, 
   methods:{
       ...mapMutations(['mutationTid']),
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
            //    console.log(res.data.length);
                for(let i=0;i<res.data.length;i++){
                    // console.log(res.data)
                    var z={text:res.data[i].name}
                    he.push(z)
                }
                // console.log(he);
               that.fenLei=he;
            // that.fenLei=res.data;

           })
        },
        // 商家优惠信息
        youhui(id){
            var that =this
            this.$axios.post('/biz/querySpecialOfferByShopId?shopId='+id).then(function(res){
                    // console.log(res.data)
                    that.youhuis=res.data
            })
        },
        //分类点击下标
        aa(id){
            this.mutationTid(id);
        },
        //分类id+商家id
        details(id,sid){
            var that=this;
            this.$axios.get('biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId='+id+'&foodcategoryId='+sid)
            .then(function(res){
                // console.log(res.data);
                that.shops=res.data;
            })
        },
        //获取详细商品
        dtl(){
             this.details(this.id,this.tid)//获取到的为第一个？？？
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
.chyLeftDiv{
    width:30%;
    background-color: rgb(216, 210, 210);
}
.chyLeftDiv>p{
    margin-top:10px;
}
.chyactive{
    background-color: floralwhite;
    border-left: red;
}
</style>