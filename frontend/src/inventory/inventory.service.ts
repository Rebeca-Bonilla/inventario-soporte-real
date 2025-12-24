import { api } from '@/shared/api'

export const getEquipos = (tipo: string) => api.get(`/equipos?tipo=${tipo}`)

export const crearEquipo = (data: any) => api.post('/equipos', data)
