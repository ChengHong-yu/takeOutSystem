import Vue from 'vue'
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import Order from '@/components/Order.vue';
import Search from '@/components/Search.vue';
import My from '@/components/My.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue'
import List from '@/components/List.vue'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        { path: '/index', component: Index },
        { path: '/order', component: Order },
        { path: '/search', component: Search },
        { path: '/my', component: My },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/list/:id', component: List ,props:true}
    ]
})