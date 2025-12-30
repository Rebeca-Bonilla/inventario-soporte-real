import { Elysia } from 'elysia'
import { pool } from '../shared/db/database'

export const colaboradoresRoutes = new Elysia({
  prefix: '/inventory/colaboradores'
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
    FROM colaboradores
    WHERE
      UPPER(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(
                REPLACE(nombre_completo,'Á','A'),
              'É','E'),
            'Í','I'),
          'Ó','O'),
        'Ú','U')
      ) = ?
      AND activo = 1
    LIMIT 1
    `,
    [nombre]
  )

  if (!rows.length) {
    set.status = 404
    return { message: 'Colaborador no encontrado' }
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
    SELECT id, nombre_completo
    FROM colaboradores
    WHERE id = ?
      AND activo = 1
    LIMIT 1
    `,
    [id]
  )

  if (!rows.length) {
    set.status = 404
    return { message: 'Colaborador no encontrado' }
  }

  return {
    id: rows[0].id,
    nombre: rows[0].nombre_completo
  }
})
