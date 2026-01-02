import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 👇 FORCE THEME INIT (THIS LINE FIXES EVERYTHING)
import './shared/theme.ts'

createApp(App)
  .use(router)
  .mount('#app')
