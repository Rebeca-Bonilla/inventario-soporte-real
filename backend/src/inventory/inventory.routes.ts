import { Elysia } from 'elysia'
import { pool } from '../shared/db/database'

export const inventoryRoutes = new Elysia({
  prefix: '/inventory'
})

/* ======================================================
   INVENTARIO (LISTADO REAL)
====================================================== */
.get('/', async () => {
  const [rows]: any = await pool.query(`
    SELECT *
    FROM vista_equipos_activos
    ORDER BY fecha_registro DESC
  `)

  return rows
})

/* ======================================================
   HISTORIAL
====================================================== */
.get('/historial', async () => {
  const [rows]: any = await pool.query(`
    SELECT
      id,
      cambio_realizado AS cambio,
      usuario,
      DATE_FORMAT(fecha, '%d-%m-%y') AS fecha,
      TIME_FORMAT(hora, '%H:%i:%s') AS hora
    FROM historial
    ORDER BY id DESC
    LIMIT 100
  `)

  return rows
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

  const [result]: any = await pool.query(
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
    id: result.insertId
  }
})
