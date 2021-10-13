import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        tabs:[
            {id:0,name:'index',logo:"首页",icon:'wap-home-o',isActive:true},
            {id:1,name:'search',logo:"搜索",icon:'search',isActive:false},
            {id:2,name:'order',logo:"订单",icon:'records',isActive:false},
            {id:3,name:'my',logo:"我的",icon:'user-o',isActive:false}
        ],
        isLogined:true,
        loginname:''
    },
    getters:{},
    mutations:{},
    actions:{}
});
export default store;