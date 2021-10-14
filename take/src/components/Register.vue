<template>
    <div>
        <div class="app">
        <h1>牛牛外卖</h1>
        <h4>注册</h4>
        <van-cell-group>
            <van-field v-model="account" label="账号" placeholder="请输入账号" />
            <van-field v-model="password" label="密码" type="password"  border placeholder="请输入密码" style="margin-top: 5%;" />
            <van-field v-model="loginname" label="用户名" border placeholder="请输入用户名" style="margin-top: 5%;" />
        </van-cell-group>
        <van-button round type="primary" size="large" @click.native="doregiter">注册</van-button>
        
    </div>
    </div>
</template>
<script>
export default {
    name:'Register',
    data:function(){
        return{
            account:'',
            password:'',
            loginname:''
            
        }
    },
    methods:{
        doregiter(){
            var that = this;
            this.$axios.post('/user/register',{
                account:this.account,
                password:this.password,
                name:this.loginname
            }).then(function(res){
                console.log(res);
                if(res.data=='register success'){
                    that.$toast({
                    message:'注册成功',
                    position:'bottom'
                })
                that.$router.push('/login')
                }else if(res.data=='register fail'){
                    that.$toast({
                    message:'注册失败',
                    position:'bottom'
                })
                }else{
                    that.$toast({
                    message:'用户已存在',
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