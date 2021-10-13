<template >
  <div id="app">
        <van-nav-bar  class="Y" title="搜索"/>
     <form action="">
          <van-search 
                show-action
                placeholder="请输入商家或美食名称">
             <template #action>
                  <div @click="click">提交</div>
             </template>
          </van-search>
     </form>
     <!-- <ul v-for="(p,index) in arr " :key="index">
            <li>{{p.name}}</li>
            <li>{{p.notice}}</li>
            <img :src="`http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/${p.photo}`" alt="">
        </ul> -->
        <van-card 
        price="2.00"
        desc="名称"
        title="介绍"
        thumb="`http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/${p.photo}`"
        :centered="false">
  
</van-card>
  </div>
</template>
<script>

import { Toast } from 'vant';

export default {
   data() {
    return {
         
      arr:[],
      value: '',
    };
  },
  methods:{
       click:function(){
            var that =this
            this.$axios.get('/biz/queryAllShopsInfoByName?name='+that.value).then(function(res){
                console.log(res.data);
                that.arr=res.data
            })
        },



      onSearch(){
          console.log(1);
      },
      onCancel(){
            console.log(2);
      }
  }
  
}
</script>
<style scoped>
   .Y{
       background-color: #f88323;
   }
</style>


