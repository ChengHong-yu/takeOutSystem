<template>
    <div>

        <!-- 订单显示 -->
        <van-nav-bar class="titleBar" title="订单列表" />
        
        <van-empty description="暂未登录" v-if="!isLogined">
            <van-button round type="danger" to="my" class="bottom-button">立即登录</van-button>
        </van-empty>
        <div v-else style="margin-bottom:60px">
            <van-empty description="暂无订单" v-if="shops.length==0">
            </van-empty>
            <van-cell-group  v-for='(item,index) in shops' :key='index' v-else>
                <van-cell to='/index' :value='item.roderTime'>
                 <template #title>
                <span style="font-weight:bold">{{item.shopName}}</span>
                 </template>
                </van-cell>
                <van-swipe-cell v-for='(aa,ii) in item.list' :key='ii'>
                    <van-card
                        :num="aa.buyCount"
                        :desc="aa.info"
                        
                        class="goods-card"
                        :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+aa.foodPhoto"
                    >
                      <template #title>
                        <span style="font-size:14px;">{{aa.foodName}}</span>
                       
                        </template>
                    </van-card>
                </van-swipe-cell>
                <van-button  @click="delButton(item.id)"  class="delbtn" round type="info" size="small">删&nbsp;&nbsp;除</van-button> 
            
            </van-cell-group>
            
        </div>
                <!-- tab切换 -->
        <van-tabbar style="margin-top:60px" v-model='active'>
            <van-tabbar-item v-for='(item,index) in tabs' :key='index' replace :icon='item.icon' :to="'/'+item.name"> 
                {{item.logo}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    name:'order',
    data(){
        return {
            shops:[],
            active:2
        }
    },
    computed:{
        ...mapState(['isLogined','loginname','tabs'])
    },
    methods:{ 
        //删除订单
        delButton(sid){
            var that=this;
            this.$dialog.confirm({
                title: '删除',
                message: '确认删除该订单吗',
                })
            .then(() => {
               this.$axios.get('/biz/deleteOrderByOid?orderId='+sid).then(function(res){
            //         // console.log(res);
                    that.$router.go(0);
                })
             })
            .catch(() => {
            });
        }
    },
    created:function(){
        //获取用户id
        var id=window.sessionStorage.getItem('loginid');
        var that=this;
        //获取用户全部订单
        this.$axios.get('/biz/queryOrdersByUserId?userId='+id).then(function(res){
            console.log(res.data);
            that.shops=res.data;
        })
    }
}
</script>
<style scoped>

.delbtn{
 margin: 10px 0;
  position: relative;
  left: 84%;

}
.van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    background-color: #fff;
}
</style>