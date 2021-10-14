import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue';
import Order from '@/components/Order.vue';
import Search from '@/components/Search.vue';
import List from '@/components/List.vue';
import My from '@/components/My.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {path:'/index',component:Index},
    {path:'/order',component:Order},
    {path:'/search',component:Search},
    {path:'/list/:id',component:List, props:true},
    {path:'/my',component:My}
  ]
})
