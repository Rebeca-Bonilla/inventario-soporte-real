import { Elysia } from 'elysia'
import { pool } from '../shared/db/database'

export const inventoryRoutes = new Elysia({
  prefix: '/inventory'
})

/* ======================================================
   COLABORADORES
====================================================== */

// buscar por nombre normalizado
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

// obtener por id
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

/* ======================================================
   CENTROS DE TRABAJO
====================================================== */

// buscar por nombre
.get('/centros-trabajo/buscar', async ({ query, set }) => {
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

// obtener por id
.get('/centros-trabajo/:id', async ({ params, set }) => {
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

/* ======================================================
   CREAR EQUIPO
====================================================== */
.post('/', async ({ body, set }) => {
  const data = body as any

  if (!data.marca || !data.modelo || !data.ubicacion) {
    set.status = 400
    return { message: 'Faltan campos obligatorios' }
  }

  const [result] = await pool.query(
    `
    INSERT INTO equipos (
      tipo,
      marca,
      modelo,
      numero_serie,
      estado,
      ubicacion,
      centro_trabajo_id,
      colaborador_id,
      ram_gb,
      almacenamiento_gb,
      procesador,
      creado_por
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.tipo,
      data.marca,
      data.modelo,
      data.numero_serie ?? null,
      data.estado ?? 'Activo',
      data.ubicacion,
      data.centro_trabajo_id ?? null,
      data.colaborador_id ?? null,
      data.ram_gb ?? null,
      data.almacenamiento_gb ?? null,
      data.procesador ?? null,
      1
    ]
  )

  return {
    ok: true,
    id: (result as any).insertId
  }
})
