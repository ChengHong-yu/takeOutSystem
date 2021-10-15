<template>
    <div class="app">
        <h1>牛牛外卖</h1>
        <h4>登录</h4>
        <van-cell-group>
            <van-field v-model="account" label="账号" placeholder="请输入账号" />
            <van-field v-model="password" label="密码" type="password"  border placeholder="请输入密码" style="margin-top: 5%;" />
        </van-cell-group>
        <van-button round type="primary" size="large" @click.native="dologin">登录</van-button>
        
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    name:'Login',
    data:function(){
        return{
            account:'',
            password:''
        }
    },
    methods:{
        ...mapMutations(['mutationIsLogined','mutationLoginname','mutationAuthorid']),
        dologin(){
            var that=this;
            this.$axios.post('/user/login',{
                account:this.account,
                password:this.password
            }).then(function(res){
                console.log(res);
                if(res.data){
                    //修改登录状态
                that.mutationIsLogined();
                that.mutationLoginname(res.data.name);
                that.mutationAuthorid(res.id);
                window.localStorage.setItem('loginStatus',true);
                window.sessionStorage.setItem('loginname',res.data.name);
                window.sessionStorage.setItem('loginid',res.data.id);
                window.sessionStorage.setItem('account',that.account);
                that.$router.push('/my') 
                }else{
                    
                that.$toast({
                    message:'用户名或者密码错误',
                    position:'bottom'
                })
                }

            })
        }
    }
}
</script>
<style scoped>
.app{
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f88323;
}
.van-button{
    margin-top: 10%;
    width: 80%;
}
.van-field{
    border: 1px solid #ccc;
}
</style>