  <template>
  <div id="app">
    <van-tabbar style="margin-top:60px" >
      <van-tabbar-item v-for='(item,index) in tabs' :key='index' replace :to="'/'+item.name"> 
        <van-icon :name="item.icon" class="van-icon"/>
        {{item.logo}}
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'App',
  computed:{
    ...mapState(['tabs'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */

}
</style>
