import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/me',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/teachers',
      name: 'teacher',
      component: () => import('../views/Teachers.vue')
    },
    {
      path: '/emptyroom',
      name: 'emptyroom',
      component: () => import('../views/EmptyRoom.vue')
    }
  ]
})
