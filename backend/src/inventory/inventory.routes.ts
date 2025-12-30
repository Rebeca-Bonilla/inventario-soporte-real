import { Elysia } from 'elysia'
import { pool } from '../shared/db/database'

export const inventoryRoutes = new Elysia({ prefix: '/inventory' })

  // 🔍 BUSCAR COLABORADOR POR NOMBRE NORMALIZADO
  .get('/colaboradores/buscar', async ({ query, set }) => {
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
                  REPLACE(nombre_completo, 'Á','A'),
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
// 🔍 OBTENER COLABORADOR POR ID
.get('/colaboradores/:id', async ({ params, set }) => {
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

  // 📥 CREAR EQUIPO
  .post('/', async ({ body }) => {
    const { tipo, data } = body as {
      tipo: string
      data: Record<string, any>
    }

    if (!data.marca || !data.modelo || !data.ubicacion) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos obligatorios' }),
        { status: 400 }
      )
    }

    const [result] = await pool.query(
      `
      INSERT INTO equipos (
        tipo,
        etiqueta_inventario,
        marca,
        modelo,
        numero_serie,
        estado,
        ubicacion,
        centro_trabajo_id,
        ram_gb,
        almacenamiento_gb,
        tipo_almacenamiento,
        procesador,
        creado_por
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        tipo,
        data.etiqueta_inventario ?? null,
        data.marca,
        data.modelo,
        data.numero_serie ?? null,
        data.estado ?? 'Activo',
        data.ubicacion,
        data.centro_trabajo_id ?? 1,
        data.ram_gb ?? null,
        data.almacenamiento_gb ?? null,
        data.tipo_almacenamiento ?? null,
        data.procesador ?? null,
        1
      ]
    )

    return {
      ok: true,
      id: (result as any).insertId
    }
  })
