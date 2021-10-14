import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        tabs: [
            { id: 0, name: 'index', logo: "首页", icon: 'wap-home-o', isActive: true },
            { id: 1, name: 'search', logo: "搜索", icon: 'search', isActive: false },
            { id: 2, name: 'order', logo: "订单", icon: 'records', isActive: false },
            { id: 3, name: 'my', logo: "我的", icon: 'user-o', isActive: false }
        ],
        isLogined: false, //登录状态，默认false
        loginname: '',
        authorid: '' //登录id

    },
    getters: {},
    mutations: {
        //修改登录状态
        mutationIsLogined(state) {
            state.isLogined = true
        },
        //修改登录名
        mutationLoginname: function(state, payload) {
            state.loginname = payload;

        },
        //修改登录id
        mutationAuthorid: function(state, payload) {
            state.authorid = payload;

        },
    },
    actions: {}
});
export default store;