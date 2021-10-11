import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        tabs:[
            {id:0,name:'index',isActive:true},
            {id:1,name:'search',isActive:false},
            {id:2,name:'order',isActive:false},
            {id:3,name:'my',isActive:false}
        ]
    },
    getters:{},
    mutations:{},
    actions:{}
});
export default store;