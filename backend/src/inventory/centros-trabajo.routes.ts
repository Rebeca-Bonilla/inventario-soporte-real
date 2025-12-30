import { Elysia } from 'elysia'
import { pool } from '../shared/db/database'

export const centrosTrabajoRoutes = new Elysia({
  prefix: '/inventory/centros-trabajo'
})

/* 🔍 BUSCAR POR NOMBRE NORMALIZADO */
.get('/buscar', async ({ query, set }) => {
  const nombre = query.nombre as string

  if (!nombre) {
    set.status = 400
    return { message: 'Nombre requerido' }
  }

  const [rows]: any = await pool.query(
    `
    SELECT id
    FROM centros_trabajo
    WHERE UPPER(nombre) = ?
      AND activo = 1
    LIMIT 1
    `,
    [nombre]
  )

  if (!rows.length) {
    set.status = 404
    return { message: 'Centro de trabajo no encontrado' }
  }

  return { id: rows[0].id }
})

/* 🔍 OBTENER POR ID */
.get('/:id', async ({ params, set }) => {
  const id = Number(params.id)

  if (!id) {
    set.status = 400
    return { message: 'ID inválido' }
  }

  const [rows]: any = await pool.query(
    `
    SELECT id, nombre
    FROM centros_trabajo
    WHERE id = ?
      AND activo = 1
    LIMIT 1
    `,
    [id]
  )

  if (!rows.length) {
    set.status = 404
    return { message: 'Centro de trabajo no encontrado' }
  }

  return {
    id: rows[0].id,
    nombre: rows[0].nombre
  }
})
