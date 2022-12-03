import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TransfersView from '../views/TransfersView.vue'
import WalletsView from '../views/WalletsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/transfers',
      name: 'transfers',
      component: TransfersView
    },       
    {
      path: '/wallets',
      name: 'wallets',
      component: WalletsView
    },    
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})



export default router
