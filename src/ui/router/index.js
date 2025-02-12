import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AutoShieldsView from '../views/AutoShieldsView.vue'
import BoardsView from '../views/BoardsView.vue'
import SetupsView from '../views/SetupsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auto-shields',
      name: 'auto-shields',
      component: AutoShieldsView,
    },
    {
      path: '/boards',
      name: 'boards',
      component: BoardsView,
    },
    {
      path: '/setups',
      name: 'setups',
      component: SetupsView,
    }
  ],
})

export default router
