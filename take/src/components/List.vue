<template>
    <div>
        <!-- 标题 -->
        <van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
        <p>{{this.$route.params.id}}</p>
    </div>
</template>

<script>
export default {
    props:['id'],
   data:function(){
       return{}
   },
   created:function(){
       this.shujv()
   }, 
   methods:{
       //商家数据
       shujv(){
           this.$axios.get('/biz/queryAllShopsInfo').then(function(res){
               console.log(res.data)
           })
       }
   }
}
</script>


<style scoped>

</style>