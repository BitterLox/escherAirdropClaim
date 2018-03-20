import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Airdrop from '@/views/Airdrop'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: 'airdrop',
      name: 'Home',
      component: Full,
      children: [
        {
          path: '/airdrop/:contract',
          name: 'Airdrop',
          component: Airdrop,
          props: true
        }
      ]
    }
  ]
})
