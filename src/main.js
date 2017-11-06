// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Cookies from 'js-cookie'
import * as filters from './filters' // 全局filter
// import Axios from 'axios'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)
// Vue.use(Axios)
Vue.config.productionTip = false

/* eslint-disable no-new */

// router.beforeEach((to,from,next)=>{

// })

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  beforeDestroy(){
    Cookies.remove('login')
    Cookies.remove('imgList')
  }
})
