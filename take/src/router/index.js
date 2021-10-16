import Vue from 'vue'
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import Order from '@/components/Order.vue';
import Search from '@/components/Search.vue';
import My from '@/components/My.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue'
import List from '@/components/List.vue'
import New from '@/components/New.vue'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        { path: '/index', component: Index },
        { path: '/order', component: Order },
        { path: '/search/', component: Search,props:true},
        { path: '/my', component: My },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/new/:bigId', component: New,props:true },
        { path: '/list/:id', component: List ,props:true}
    ]
})