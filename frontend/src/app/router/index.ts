import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/auth/LoginView.vue'
import DashboardView from '@/dashboard/DashboardView.vue'
import InventoryView from '@/inventory/InventoryView.vue'
import HistorialView from '@/historial/HistorialView.vue'
import ReportesView from '@/reportes/ReportesView.vue'
import MainLayout from '@/app/layouts/MainLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },

    { path: '/login', component: LoginView },

    {
      path: '/app',
      component: MainLayout,
      children: [
        { path: 'dashboard', component: DashboardView },
        { path: 'inventory', component: InventoryView },
        { path: 'historial', component: HistorialView },
        { path: 'reportes', component: ReportesView },
      ],
    },
  ],
})
