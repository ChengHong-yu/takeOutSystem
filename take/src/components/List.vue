<template>
    <div>
        <!-- 头部标题信息 -->
        <div class='headDiv'>
            <!-- 标题 -->
            <van-nav-bar id="zsz" left-arrow @click-left="onClickLeft"/>
            <div class="top-img"><img  :src="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+shop.photo" alt=""></div>
              <div style="font-weight:bold;font-size:16px; text-align:center"> <van-tag size='medium' text-color=black color="#FCE33B">品牌</van-tag> {{shop.name}}</div>
            <p class="neirong">
                <span>{{shop.score}}</span>
                <span>月售{{shop.sales}}单</span>
                <span>硅谷专送</span>
                <span>约{{shop.deliveryTime}}分钟</span>
                <span>距离{{shop.distance}}m</span>
            </p>
            <p class="neirong2"><van-tag type="success">优惠</van-tag> 新用户下单立减17元（不与其他活动同时使用）<span>6优惠</span></p>
            
        </div>
        <div class="van-hairline--bottom"></div>
        <!-- tab切换 -->
        <van-tabs>
            <van-tab v-for="(item,index) in tab22" :title="item.name" :key='index'>
                <div v-if='index==0' class="shopAll">
                    <!-- 分类 -->
                    <van-tree-select :items="fenLei" height="100%" :main-active-index.sync="active" @click-nav='aa'  @click.native='dtl'>
                        <template #content >
                            <ul >
                                <li v-for='(s,i) in shops' :key='i'  @click='bb(s.id)'>
                                    <img :src="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+s.photo">
                                    <a><b>{{s.name}}</b></a>
                                    <div>
                                        <button><a data-a='-'>-</a></button>
                                        <!-- <button @click='shopCount($event)'><a data-a='-'>-</a></button> -->
                                        <!-- <span>{{s.count}}</span> -->
                                        <button @click.prevent='shopCount(s.id,$event)'><a data-a='+'>+</a></button>
                                    </div>
                                    <!-- <van-stepper v-model="value" theme="round" button-size="22" disable-input /> -->
                                </li>
                            </ul>
                        </template>
                    </van-tree-select>
                    <div class='shopCar'>
                        <div>
                            <button>购物车</button>
                            <button @click="jieSuan()">结算</button>
                        </div>
                    </div>
                </div>
                <!-- 评分 -->
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
                <!-- 商家优惠信息 -->
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
import {mapMutations, mapState} from 'vuex'
export default {
    props:['id'],
   data:function(){
       return{
           shop:{},
           //分类
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
           score:4,
           //商品分类详情
           shops:[],
           //商品数量
           value:1,
           //
           buyCount:0,
           //
           news:[]
       }
   },
   computed:{
       ...mapState(['tab22','tid','sCount'])
   },
   created:function(){
       this.shujv(this.id);
       this.fenlei(this.id);
       this.youhui(this.id);
       this.evaluate(this.id);
       this.details(this.id,this.tid);   
   }, 
   methods:{
       ...mapMutations(['mutationTid','mutationsCount']),
       //获取评价信息
       evaluate(id){
           var that=this;
           this.$axios.get('/biz//queryCommentByShopId?shopId='+id).then(function(res){
            //    console.log(res.data);
            that.evaluates=res.data;
            // console.log(res.data.score);
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
                for(var a=0;a<that.shops.length;a++){
                    that.$set(that.shops[a],'count',0);
                }
                // console.log(that.shops)
            })
        },
        //获取详细商品
        dtl(){
             this.details(this.id,this.tid);
        },
        //商品点击时，获取全部数据
        bb(data){
            // console.log(data);
        },
        //加减
        shopCount(id,e){  
           for(var i=0;i<this.shops.length;i++){
                if(this.shops[i].id==id){
                    console.log(this.shops[i]);
                    console.log(this.shops[i].id);
                    console.log(this.shops[i].count);
                    console.log(typeof this.shops[i])
                    this.shops[i].count++;
                    // if(!this.shops[i].count){
                    //     this.$set(this.shops[i],'count',1);
                    //      console.log(this.shops[i].count);
                    // }else{
                    //      console.log(11111);
                    //     // var b=this.shops[i].count;
                    //     // this.shops[i].count=b+1;
                    //     // console.log(typeof this.shops[i].count);//number
                    //     // console.log(this.shops[i]);
                    // }
                    
                }                
           }
        // console.log(this.shops);
        }
   }
}
</script>
<style scoped>
#zsz {
   background:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F7%2F584260a8b8615.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636963117&t=ebea508b9443995cd2708154d7dd4478/assets/logo.png') no-repeat ;
}
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
/* ================头部布局 */
.top-img{
    width: 70px;
    height: 60px;
    margin: 0 auto;
    position: relative;
}
.top-img img{
    width: 100%;
    height: 100%;
    border-radius: 6px;
    box-shadow: 5px 5px 5px rgb(110, 110, 110);
    position: absolute;
    top: -30px;
    z-index: 99;
}
.neirong span{
    font-size: 11px;
}
.neirong2{
    font-size: 11px;

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
img{
    width:40%;
    height:40%;
}
.shopAll{
    position: relative;
}
.shopCar{
    position: fixed;
    bottom:0px;
    width:100%;
    height:40px;
    background-color: rgb(110, 109, 109);
    border-radius: 10px;
}
</style>