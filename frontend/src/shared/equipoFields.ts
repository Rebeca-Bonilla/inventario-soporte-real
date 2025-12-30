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
  type?: 'text' | 'number' | 'date' | 'select'
  options?: string[]
}

export const equipoFields: Record<
  EquipoTipo,
  { left: Campo[]; right: Campo[] }
> = {
  computadora: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'RAM (GB)', key: 'ram_gb', type: 'number' },
      { label: 'Almacenamiento (GB)', key: 'almacenamiento_gb', type: 'number' }
    ],
    right: [
      { label: 'Procesador', key: 'procesador' },

      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: [
          'Activo',
          'Inactivo',
          'En reparación',
          'Dañado',
          'Baja',
          'Prestado',
          'Reservado'
        ]
      },

      { label: 'Colaborador (Nombre)', key: 'colaborador_nombre' },
      { label: 'Colaborador (ID)', key: 'colaborador_id', type: 'number' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  monitor: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'Dimensión (pulgadas)', key: 'tamaño_pulgadas', type: 'number' },
      { label: 'Puertos disponibles', key: 'puertos' }
    ],
    right: [
      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja']
      },
      { label: 'Colaborador (Nombre)', key: 'colaborador_nombre' },
      { label: 'Colaborador (ID)', key: 'colaborador_id', type: 'number' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  celular: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'IMEI', key: 'imei' },
      { label: 'Número telefónico', key: 'numero_telefono' },
      { label: 'Plan de datos', key: 'plan_datos' }
    ],
    right: [
      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja', 'Prestado']
      },

      { label: 'Colaborador (Nombre)', key: 'colaborador_nombre' },
      { label: 'Colaborador (ID)', key: 'colaborador_id', type: 'number' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  telefono_fijo: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },
      { label: 'Extensión', key: 'extension' }
    ],
    right: [
      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja']
      },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  camara: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'N/S', key: 'numero_serie' },

      {
        label: 'Tipo de cámara',
        key: 'tipo_camara',
        type: 'select',
        options: ['bala', 'domo', 'profesional', 'compacta', 'video', 'ip', 'otro']
      },

      { label: 'Resolución (MP)', key: 'resolucion_mp', type: 'number' }
    ],
    right: [
      { label: 'Dirección IP', key: 'direccion_ip_camara' },

      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja']
      },

      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  tablet: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'Dimensión (pulgadas)', key: 'dimension_pulgadas', type: 'number' },
      { label: 'Capacidad (GB)', key: 'capacidad_gb', type: 'number' },
      { label: 'Versión Android', key: 'version_android' }
    ],
    right: [
      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja', 'Prestado']
      },

      { label: 'Colaborador (Nombre)', key: 'colaborador_nombre' },
      { label: 'Colaborador (ID)', key: 'colaborador_id', type: 'number' },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  terminal: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' },
      { label: 'Versión Android', key: 'version_android_terminal' }
    ],
    right: [
      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja']
      },
      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  },

  otro: {
    left: [
      {key: 'centro_trabajo_nombre', label: 'Centro de Trabajo (Nombre)', type: 'text'},
      {key: 'centro_trabajo_id', label: 'Centro de Trabajo (ID)', type: 'number'},
      { label: 'Tipo específico', key: 'tipo_especifico' },
      { label: 'Marca', key: 'marca' },
      { label: 'Modelo', key: 'modelo' }
    ],
    right: [
      { label: 'Campo extra', key: 'campo_extra' },

      {
        label: 'Estado',
        key: 'estado',
        type: 'select',
        options: ['Activo', 'Inactivo', 'Baja']
      },

      { label: 'Ubicación', key: 'ubicacion' },
      { label: 'Observaciones', key: 'observaciones' },
      { label: 'Fecha de registro', key: 'fecha_registro', type: 'date' }
    ]
  }
}
