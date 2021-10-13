// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store'
import axios from 'axios'
Vue.prototype.$axios=axios.create({
  baseURL:"http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT"
})
Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$axios=axios.create({
  baseURL:"http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT"
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
