import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { cors } from '@elysiajs/cors'

import { authRoutes } from './auth/auth.routes'
import { inventoryRoutes } from './inventory/inventory.routes'

const app = new Elysia({
  adapter: node()
})

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

app.get('/', () => ({
  status: 'ok',
  message: 'Backend Inventario funcionando 🚀'
}))

app.use(authRoutes)
app.use(inventoryRoutes)
app.listen(3000)

console.log('🟢 Servidor corriendo en http://localhost:3000')
