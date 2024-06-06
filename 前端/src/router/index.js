import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/newHome.vue'
import upLoad from '../views/upLoad.vue'
import predict from '../views/predictData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'upload',
      component: upLoad
    },
    {
      path: '/visual',
      name: 'visual',
      component: () => import('../views/visualData.vue')
    },
    {
      path: '/predict',
      name: 'predict',
      component: predict
    }
  ]
})

export default router
