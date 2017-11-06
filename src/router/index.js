import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../view/login')
const Index = () => import('../view/index')
const Yellow = () => import ('../view/yellow')
const Face = () => import ('../view/face')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    }, 
    {
      path: '/yellow',
      name: 'yellow',
      component: Yellow
    },
    {
      path: '/face',
      name: 'face',
      component: Face
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
