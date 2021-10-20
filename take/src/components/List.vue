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
                    <van-tree-select :items="fenLei" height='600px' :main-active-index.sync="active" @click-nav='aa'  @click.native='dtl'>
                        <template #content >
                            <ul >
                                <li v-for='(s,i) in shops' :key='i'>
                                    <van-card
                                      :desc="s.info"
                                      :title="s.name"
                                      :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+s.photo"
                                    >
                                        <template #num>
                                        <van-button icon="plus" size='small' color="#F11727" type="primary" @click.prevent='shopCount(s.id,$event)'/>
                                        </template>
                                    </van-card>
                                </li>
                            </ul>
                        </template>
                    </van-tree-select>
                    <div class=''>
                        <div>
                            <!-- 弹出层 -->
                            <!-- <div  class="tanchu"> -->
                                <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" >
                                      <div style="overflow:hidden"><van-icon size='25px' style=" float:right;margin:5px 30px 0 0" name="delete" @click.native="del()"/></div>
                                <div class="van-hairline--bottom"></div>
                                <ul >
                                    <li v-for="z in news" :key="z.foodId">
                                               <van-card
                                      :desc="z.info"
                                      :title="z.name"
                                      :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+z.photo"
                                    >
                                        <template #num>
                                                    <button @click.prevent='shopJian(z.foodId)'>-</button>
                                            {{z.buyCount}}
                                            <button @click.prevent='shopCount(z.foodId)'>+</button>
                                        </template>
                                    </van-card>
                                    </li>
                                </ul>
                                </van-popup>
                                <div class="bottom-z">
                                      <!-- <div style="position:relative; z-index:99;"  @click.prevent="qiehuan">购物车</div>  -->
                                    <!-- <van-submit-bar  button-text="提交订单" @click.native='tijiao()' >                               
                                    </van-submit-bar>  -->
                                 <van-goods-action>
                                  
                                  <van-goods-action-icon icon="cart-o" text="购物车" @click="qiehuan" />
                                
                                  <van-goods-action-button
                                    type="danger"
                                    text="立即购买"
                                    @click="tijiao()"
                                  />
                                </van-goods-action>
                                </div>
    
                                
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
           news:[],
           //弹出层显示
           show:false,
           //切换z
           z:false
       }
   },
   computed:{
       ...mapState(['tab22','tid','sCount','isLogined'])
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
            })
        },
        //获取详细商品
        dtl(){
             this.details(this.id,this.tid);
        },
        //进行商品数量的添加与删减
        shopCount(id,e){   
           if(!this.isLogined){
               this.$toast({
                   message:'请先登录！'
               })
           }else{
               for(var i=0;i<this.shops.length;i++){
                if(this.shops[i].id==id){//点击的id与商品的id保持一致
                    if(this.news.length==0){//新建的数组无商品时，添加商品
                        let addItem={
                            name:this.shops[i].name,
                            photo:this.shops[i].photo,
                            foodId:this.shops[i].id,
                            buyCount:1
                        };
                        this.news.push(addItem);
                        return;
                    }else{//新建数组存在商品，则进行商品数量添加
                        //flag:若新建数组里面的商品id与点击的id不一致时，返回true，进行商品添加
                        //     若数组id与点击的id一致，返回false，则进行商品数量添加
                        let flag=this.news.every(value=>value.foodId!=this.shops[i].id);
                        if(flag){//true表示点击的id与数组id不一致
                            let addItem={
                                name:this.shops[i].name,
                                photo:this.shops[i].photo,
                                foodId:this.shops[i].id,
                                buyCount:1
                            };
                            this.news.push(addItem);
                            return;
                        }else{//flag=false
                            for(var a=0;a<this.news.length;a++){
                                if(this.news[a].foodId==this.shops[i].id){//找到数组对应的id
                                    // console.log(this.news[a].count);
                                    this.news[a].buyCount+=1;
                                }
                            }
                        }
                    }
                }                
            }
           }
            // console.log(this.news);
        },
        //弹出层显示隐藏
        qiehuan(){
            // var z=document.getElementsByClassName('tanchu')[0];
            // console.log(z)
            this.show=true
            
        },
        //商品数量减少
        shopJian(id){
            for(var i=0;i<this.shops.length;i++){
                if(this.shops[i].id==id){//点击的id与商品的id保持一致
                    let flag=this.news.every(value=>value.foodId!=this.shops[i].id);
                    if(!flag){//true表示点击的id与数组id不一致
                        for(var a=0;a<this.news.length;a++){
                            if(this.news[a].foodId==this.shops[i].id){//找到数组对应的id
                                // console.log(this.news[a].count);
                                if(this.news[a].buyCount==1){
                                    this.news.splice(a,1);
                                    return;
                                }else{
                                     this.news[a].buyCount-=1;
                                }
                               
                            }
                        }
                    }
                }                
            }
            // console.log(this.news);
        },
        // //发送订单
        // @click.native='tijiao()
        tijiao(){
            var arr=[];
            for(var i=0;i<this.news.length;i++){
                delete this.news[i].photo;
                delete this.news[i].name;
                arr=this.news;
            }
            var that=this;
            this.$axios.post('/biz/insertOrder',{
                'userId':window.sessionStorage.getItem('loginid'),
                'shopId':this.id,
                'list':arr
            }).then(function(res){
                that.$router.push('/order');
            })
        },
        //删除商品订单
        del(){
            this.news=[]
        }

    }
}
</script>
<style scoped>
.cart{
    position:relative;
    z-index: 99;
   
}
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