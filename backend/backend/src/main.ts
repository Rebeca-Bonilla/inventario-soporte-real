import { Elysia } from 'elysia'
import { inventoryRoutes } from './inventory/inventory.routes'

const app = new Elysia()
  .get('/', () => ({
    status: 'ok',
    message: 'Backend Inventario funcionando 🚀',
  }))
  .use(inventoryRoutes)
  .listen(3000)

console.log('🟢 Servidor corriendo en http://localhost:3000')
