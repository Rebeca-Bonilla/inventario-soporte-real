# 📦 Inventario de Soporte Técnico

Sistema web de **gestión de inventario de equipos de TI**, enfocado en soporte técnico, control de activos y trazabilidad de cambios.

El sistema permite **registrar, consultar, editar, archivar e importar equipos**, manteniendo un **historial de cambios**, control de permisos por rol y manejo de sesiones con tiempo límite.

---

## 🚀 Funcionalidades Principales

### 🔐 Autenticación
- Inicio de sesión con validaciones
- Manejo de sesión con **timeout por inactividad (30 min)**
- Roles de usuario (admin / usuario estándar)

### 🏠 Dashboard
- Resumen general del inventario
- Equipos próximos a eventos importantes (ej. antivirus por expirar)
- Acceso rápido a los módulos principales

### 📝 Registro de Equipos
Tipos de equipo:
- Cómputo
- Teléfonos
- Monitores
- Cámaras
- Tablets
- Terminales
- Otros

Acciones:
- Guardar localmente (cache / localStorage)
- Añadir a base de datos
- Borrar formulario (con confirmación)

### 🔍 Consulta
- Visualización del inventario actualizado
- Filtros avanzados (estilo Excel)
- Exportación de datos
- Edición de registros
- Archivado de equipos *(solo administradores)*

### 🗄️ Archivados
- Visualización de equipos archivados
- Filtros por campos
- Acceso restringido por rol

### 📥 Importación
- Importación desde archivos **CSV / XLSX**
- Validación de campos
- Detección de registros duplicados
- Vista previa editable antes de confirmar inserción

### 📊 Reportes
- Generación de reportes
- Exportación en formatos:
  - PDF
  - CSV
  - XLSX

### 🕒 Historial
- Registro de cambios del sistema
- Usuario responsable
- Fecha y hora de cada acción

---

## 🧱 Arquitectura del Proyecto

-inventario-soporte-real/
├── backend/ # API y lógica del servidor
├── frontend/ # Aplicación web (Vue 3)
├── public/ # Recursos estáticos
├── README.md
└── configuraciones


### 🖥️ Frontend
- Vue 3
- Vite
- TypeScript
- Componentes reutilizables
- Enrutamiento por vistas

### 🛠️ Backend
- Node.js
- API REST
- Base de datos relacional
- Control de roles y permisos
- Historial de acciones

---

## ⚙️ Instalación y Ejecución

### Requisitos
- Node.js 18+
- npm
- MySQL / MariaDB

### Clonar repositorio
```bash
git clone https://github.com/Rebeca-Bonilla/inventario-soporte-real.git
cd inventario-soporte-real
---

### Inicio de Backend
cd backend
npm install
npm run dev


### Inicio de Frontend
cd frontend
npm install
npm run dev

##Variables de entorno (.env)
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=inventario_prueba
DB_USER=inventario_app
DB_PASSWORD=********




