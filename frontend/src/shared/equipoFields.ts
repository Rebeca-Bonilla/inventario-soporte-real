export type EquipoTipo =
  | 'computadora'
  | 'monitor'
  | 'celular'
  | 'telefono_fijo'
  | 'camara'
  | 'tablet'
  | 'terminal'
  | 'otro'

type Campo = {
  label: string
  key: string
  type?: string
}

export const equipoFields: Record<
  EquipoTipo,
  { left: Campo[]; right: Campo[] }
> = {
  computadora: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'RAM (GB)', key: 'ram_gb' },
      { label: 'Almacenamiento (GB)', key: 'almacenamiento_gb' }
    ],
    right: [
      { label: 'Procesador', key: 'procesador' },
      { label: 'Estado', key: 'estado' },
      { label: 'Colaborador', key: 'colaborador_id' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  monitor: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'Dimensión (pulgadas)', key: 'tamaño_pulgadas' },
      { label: 'Puertos disponibles', key: 'puertos' }
    ],
    right: [
      { label: 'Estado', key: 'estado' },
      { label: 'Colaborador', key: 'colaborador_id' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  celular: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'IMEI', key: 'imei' },
      { label: 'Número telefónico', key: 'numero_telefono' },
      { label: 'Plan de datos', key: 'plan_datos' }
    ],
    right: [
      { label: 'Estado', key: 'estado' },
      { label: 'Colaborador', key: 'colaborador_id' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  telefono_fijo: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'Extensión', key: 'extension' }
    ],
    right: [
      { label: 'Estado', key: 'estado' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  camara: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'Tipo de cámara', key: 'tipo_camara' },
      { label: 'Resolución (MP)', key: 'resolucion_mp' }
    ],
    right: [
      { label: 'Dirección IP', key: 'direccion_ip_camara' },
      { label: 'Estado', key: 'estado' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  tablet: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'Dimensión (pulgadas)', key: 'dimension_pulgadas' },
      { label: 'Capacidad (GB)', key: 'capacidad_gb' },
      { label: 'Versión Android', key: 'version_android' }
    ],
    right: [
      { label: 'Estado', key: 'estado' },
      { label: 'Colaborador', key: 'colaborador_id' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  terminal: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'Versión Android', key: 'version_android_terminal' }
    ],
    right: [
      { label: 'Estado', key: 'estado' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  otro: {
    left: [
      { label: 'Centro de Trabajo', key: 'centro_trabajo_id' },
      { label: 'Tipo específico', key: 'tipo_especifico' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' }
    ],
    right: [
      { label: 'Campo extra', key: 'campo_extra' },
      { label: 'Estado', key: 'estado' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  }
}
