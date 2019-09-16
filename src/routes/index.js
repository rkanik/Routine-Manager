import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
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
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/Teacher.vue')
    },
    {
      path: '/emptyroom',
      name: 'emptyroom',
      component: () => import('../views/EmptyRoom.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
