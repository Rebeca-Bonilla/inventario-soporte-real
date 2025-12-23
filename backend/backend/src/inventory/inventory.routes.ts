import { Elysia } from 'elysia'

export const inventoryRoutes = new Elysia({ prefix: '/inventory' })
  .get('/', () => ({
    items: [],
    message: 'Inventario vacío por ahora 📦',
  }))
  .post('/', ({ body }) => ({
    message: 'Item agregado',
    data: body,
  }))
