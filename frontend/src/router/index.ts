import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },

    {
      path: '/login',
      component: LoginView
    },

    {
      path: '/app',
      component: MainLayout,
      children: [
        { path: 'dashboard', component: DashboardView },

        // placeholders para que NO truene
        { path: 'registro', component: DashboardView },
        { path: 'inventory', component: DashboardView },
        { path: 'archivados', component: DashboardView },
        { path: 'importacion', component: DashboardView },
        { path: 'reportes', component: DashboardView },
        { path: 'historial', component: DashboardView }
      ]
    }
  ]
})

export default router
