import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import RegistroView from '../views/RegistroView.vue'
import ConsultaView from '../views/ConsultaView.vue'
import ArchivadosView from '../views/ArchivadosView.vue'
import ImportacionView from '../views/ImportacionView.vue'
import ReportesView from '../views/ReportesView.vue'
import HistorialView from '../views/HistorialView.vue'


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
      { path: 'registro', component: RegistroView },
      { path: 'inventory', component: ConsultaView },
      { path: 'archivados', component: ArchivadosView },
      { path: 'importacion', component: ImportacionView },
      { path: 'reportes', component: ReportesView },
      { path: 'historial', component: HistorialView }
      ]
    }
  ]
})

export default router
