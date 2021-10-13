<template>
    <div>
        <van-nav-bar class="titleBar" title="订单列表"/>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    name:'order',
    computed:{
        ...mapState(['isLogined','loginname'])
    },
    created:function(){
        this.$axios.get('/biz/queryOrdersByUserId?userId=1').then(function(res){
            console.log(res);
        })
    }
}
</script>
<style scoped>
.titleBar{
    background-color: #f88323;
}
</style>