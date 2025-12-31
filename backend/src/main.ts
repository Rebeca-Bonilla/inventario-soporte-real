import 'dotenv/config'

import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { cors } from '@elysiajs/cors'

import { authRoutes } from './auth/auth.routes'
import { inventoryRoutes } from './inventory/inventory.routes'

// 🔹 Variables de entorno
const PORT = Number(process.env.PORT) || 3000
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

const app = new Elysia({
  adapter: node()
})

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
)

app.get('/', () => ({
  status: 'ok',
  message: 'Backend Inventario funcionando 🚀'
}))

app.use(authRoutes)
app.use(inventoryRoutes)

// 🔹 IMPORTANTE: escucha en todas las interfaces
app.listen({
  port: PORT,
  hostname: '0.0.0.0'
})

console.log(`🟢 Servidor corriendo en puerto ${PORT}`)
