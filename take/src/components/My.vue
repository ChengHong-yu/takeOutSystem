<template>
    <div>
        <div class="header">个人中心</div>
        <div style="margin-bottom:10px" class="van-hairline--bottom"></div>
        <div class="user">
            <van-image round width="5rem" height="5rem" style="padding-top:0.5rem;float: left;padding-left:0.5rem;" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
            <div class="login">
                <div class="zong">
                    <div class="login1" v-if="isLogined==false"><span @click="login">登录</span><span @click="register">/注册</span></div>
                    <div class="login1" v-else>{{loginname}}</div>
                    <div class="phone"><van-icon name="graphic" />暂无绑定的手机号</div>
                </div>
                <div class="jiantou"><van-icon name="arrow" /></div>
            </div>
        </div>
        <van-row class="botooms" gutter="20" style="margin-top:1rem">
                <van-col span="8">
                    <div> <span class="ling">0.00</span> 元</div>
                    <div>我的金额</div>
                </van-col>
                <van-col span="8">
                    <div><span class="ling">0</span>个</div>
                    <div>我的优惠</div>
                </van-col>
                <van-col span="8">
                    <div><span class="ling">0</span>分</div>
                    <div>我的积分</div>
                </van-col>
        </van-row>
        <div class="election">
            <van-row>
                <van-col span="2"><van-icon name="label" color="#1989fa" /></van-col>
                <van-col span="20" style="text-align: left; height:3rem;">我的订单</van-col>
                <van-col span="2"><van-icon name="arrow" /></van-col>
            </van-row>
            <van-row>
                <van-col span="2"><van-icon name="award" color="#1989fa" /></van-col>
                <van-col span="20" style="text-align: left; height:3rem;">积分商城</van-col>
                <van-col span="2"><van-icon name="arrow" /></van-col>
            </van-row>
            <van-row>
                <van-col span="2"><van-icon name="vip-card" color="#1989fa"  /></van-col>
                <van-col span="20" style="text-align: left; height:3rem;">牛牛外卖会员卡</van-col>
                <van-col span="2"><van-icon name="arrow" /></van-col>
            </van-row>
            <van-row>
                <van-col span="2"><van-icon name="column" color="#1989fa"  /></van-col>
                <van-col span="20" style="text-align: left; height:3rem;">服务中心</van-col>
                <van-col span="2"><van-icon name="arrow" /></van-col>
            </van-row>
        </div>
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
    name:'my',
    
    data:function(){
        return{
            loginname:window.sessionStorage.getItem('loginname'),
            active:3
        }
    },
    computed:{
        ...mapState(['isLogined','tabs'])
    },
    methods:{
        login(){
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/register')
        }
    }
}
</script>
<style scoped>
#app{
    text-align: center;
}
.van-row{
    text-align: center;
}
.header{

    color: #000;

    text-align: center;
    height: 3rem;
    line-height: 3rem;
    font-size: 18px;
}

.xiahuaxian{
    height: 0.5rem;
    background-color: rgb(250, 174, 59);
}

.user{
    /* margin-top: 22px; */
    border-radius: 8px;
    margin: 0 10px;
    background-color: #1989FA;

    color: #fff;
    height: 6rem;
    box-shadow: 3px 5px 3px rgb(175, 174, 174);
    display: flex;
    /* justify-content: flex-start; */
    /* align-items: center; */
}
.login{
    flex: 4;
    display: flex;
    flex-wrap: wrap;
}
.zong{
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    flex: 5;
}
.jiantou{
    flex: 1;
    text-align: right;
    padding-right: 1rem;
    line-height: 6rem;
}
.login1{
    height: 3rem;
    text-align: left;
    align-items: flex-end;
    display: flex;
}

.phone{
    height: 3rem;
    text-align: left;
    align-items: center;

}
.ling{
    font-size: 1.5rem;
    font-weight: 600;
    color: #f88323;
}
.election{
    margin-top: 2rem;
    padding: 0 10px;
}
.zong div{
    padding: 5px 0;
    
}
.botooms{
    box-shadow: 3px 3px 3px rgb(223, 223, 223);
    border-radius: 8px;
    padding: 10px 0;
    margin: 0 10px;
    background-color: #F8F9F9;
}
</style>