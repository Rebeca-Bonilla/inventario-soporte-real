import { Elysia } from 'elysia'

export const authRoutes = new Elysia({ prefix: '/auth' }).post('/login', ({ body }) => {
  const { email, password } = body as any

  if (email === 'admin@admin.com' && password === 'admin') {
    return { token: 'fake-jwt-token', role: 'admin' }
  }

  return { error: 'Credenciales inválidas' }
})
