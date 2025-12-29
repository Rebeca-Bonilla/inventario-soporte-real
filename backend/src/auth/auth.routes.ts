import { Elysia, t } from 'elysia'
import { pool } from '../shared/db/database'

export const authRoutes = new Elysia({ prefix: '/auth' })

authRoutes.post(
  '/login',
  async ({ body, set }) => {
    try {
      const { username, password } = body as {
        username: string
        password: string
      }

      const [rows]: any = await pool.query(
        'SELECT * FROM usuarios WHERE username = ? AND password = ? AND activo = 1',
        [username, password]
      )

      if (rows.length === 0) {
        set.status = 401
        return { message: 'Usuario o contraseña incorrectos' }
      }

      return {
        message: 'Login OK',
        user: {
          id: rows[0].id,
          username: rows[0].username,
          rol: rows[0].rol
        }
      }
    } catch (error) {
      console.error('🔥 Error en /auth/login:', error)
      set.status = 500
      return { message: 'Error interno del servidor' }
    }
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String()
    })
  }
)
