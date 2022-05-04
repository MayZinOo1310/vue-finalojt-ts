import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserList from '../components/UserList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: () => import('../components/UserRegister.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
