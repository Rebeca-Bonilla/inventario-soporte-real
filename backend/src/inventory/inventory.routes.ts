import { Elysia } from 'elysia'
import { pool } from '../shared/db/database'

export const inventoryRoutes = new Elysia({ prefix: '/inventory' })

  // 📥 CREAR EQUIPO
  .post('/', async ({ body }) => {
    const {
      tipo,
      data
    } = body as {
      tipo: string
      data: Record<string, any>
    }

    // ⚠️ campos mínimos obligatorios
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
        1 // creado_por (admin por ahora)
      ]
    )

    return {
      ok: true,
      id: (result as any).insertId
    }
  })
