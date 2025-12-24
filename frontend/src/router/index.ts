import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/app',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        }
      ]
    }
  ]
})

export default router
