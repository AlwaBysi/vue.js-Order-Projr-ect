import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import OrdersList from '@/components/aut/OrdersList'
import Aut from '@/components/aut/aut'
import Storehouse from '@/components/aut/Storehouse'
import Chart from '@/components/aut/Chart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/admin',
      name: 'Login',
      component: Login
    },
    {
      path: '/aut',
      name: 'aut',
      component: Aut,
      children: [
        {
          path: 'ordersList',
          name: 'ordersList',
          component: OrdersList
        },
        {
          path: 'Storehouse',
          name: 'Storehouse',
          component: Storehouse
        },
        {
          path: 'Chart',
          name: 'Chart',
          component: Chart
        }
      ]
    }
  ]
})
