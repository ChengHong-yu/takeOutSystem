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
                <div v-if='index==1'>
                    <div class="header">
                        <div class="left">
                            <span style="font-size:1.5rem;font-weight: 600;color: #f88323;">{{shop.score}}</span>
                            <strong style="margin:10px 0;">综合评分</strong>
                            <span>高于周边商家69.2%</span>
                        </div>
                        <div class="right">
                            <span>服务态度：<van-rate v-model="serviceScore" readonly /><span style="color: #f88323;margin-left:5px;">{{serviceScore}}</span></span>
                            <span style="margin:10px 0;">商品评分：<van-rate v-model="goodsScore" readonly /><span style="color: #f88323;margin-left:5px;">{{goodsScore}}</span></span>
                            <span style="padding-left:10px; width: 100%;text-align: left;">送到时间：{{shop.deliveryTime}}</span>
                        </div>
                    </div>
                    <div class="geli"></div>
                    <div class="pingjia">
                        <van-tabs type="card" color='#f88323'>
                            <van-tab title="全部">
                                <div class="pinglun" v-for="(item,index) in evaluates" :key="index">
                                    <div class="pleft">
                                        <van-image width="30" round height="30" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
                                    </div>
                                    <div class="pright">
                                        <span>{{item.account}}</span>
                                        <van-rate v-model="score" readonly />
                                        <span>{{item.comments}}</span>
                                        <span class="shijian" style="text-align:right;color:#999;margin-right:10px;">{{item.oederTime}}</span>
                                    </div>
                                </div>
                            </van-tab>
                            <van-tab title="满意">
                                <div  v-for="(item,index) in evaluates" :key="index" >
                                    <div class="pinglun" v-if="item.isGood==1">
                                        <div class="pleft">
                                            <van-image width="30" round height="30" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
                                        </div>
                                        <div class="pright">
                                            <span>{{item.account}}</span>
                                            <van-rate v-model="score" readonly />
                                            <span>{{item.comments}}</span>
                                            <span class="shijian" style="text-align:right;color:#999;margin-right:10px;">{{item.oederTime}}</span>
                                        </div>
                                    </div>
                                </div>
                            </van-tab>
                            <van-tab title="不满意">
                                <div  v-for="(item,index) in evaluates" :key="index" >
                                    <div class="pinglun" v-if="item.isGood==0">
                                        <div class="pleft">
                                            <van-image width="30" round height="30" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
                                        </div>
                                        <div class="pright">
                                            <span>{{item.account}}</span>
                                            <van-rate v-model="score" readonly />
                                            <span>{{item.comments}}</span>
                                            <span class="shijian" style="text-align:right;color:#999;margin-right:10px;">{{item.oederTime}}</span>
                                        </div>
                                    </div>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                </div>
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
import {mapState} from 'vuex'
export default {
    props:['id'],
   data:function(){
       return{
           shop:{},
           fenLei:[],
           active:0,
           activeIndex:0,
           //优惠
           youhuis:[],
           //评价
           evaluates:[],
           //服务态度
           serviceScore:'',
           //商品评分
           goodsScore:'',
           //用户分数
           score:4
       }
   },
   computed:{
       ...mapState(['tab22'])
   },
   created:function(){
       this.shujv(this.id);
       this.fenlei(this.id);
       this.youhui(this.id);
       this.evaluate(this.id);
       
   }, 
   methods:{
       //获取评价信息
       evaluate(id){
           var that=this;
           this.$axios.get('/biz//queryCommentByShopId?shopId='+id).then(function(res){
               console.log(res.data);
            that.evaluates=res.data;
            console.log(res.data.score);
            // that.score=splice(res.data.score,1);
           })
       },
       //商家基本信息数据
       shujv(id){
           var that=this;
           this.$axios.get('/biz//queryInfoByShopId?shopId='+id).then(function(res){
               console.log(res.data);
               that.shop=res.data;
               that.serviceScore=res.data.serviceScore;
               that.goodsScore=res.data.goodsScore;
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
                    console.log()
                    var z={text:res.data[i].name}
                    he.push(z)
                }
                // console.log(he);
               that.fenLei=he;

           })
        },
        // 商家优惠信息
        youhui(id){
            var that =this
            this.$axios.post('/biz/querySpecialOfferByShopId?shopId='+id).then(function(res){
                    // console.log(res.data)
                    that.youhuis=res.data
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
.header{
    display: flex;
    
}
.left{
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    font-size: 0.5em;
}
.right{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    font-size: 0.5em;
}
.geli{
    width: 100%;
    height: 1rem;
    background-color: rgb(233, 233, 233);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

}
.pinglun{
    display: flex;
}
.pleft{
    padding: 15px 0 0 15px;
    flex: 1;
}
.pright{
    flex: 6;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
}
</style>