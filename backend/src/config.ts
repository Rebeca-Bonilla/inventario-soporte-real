export const config = {
  port: Number(process.env.PORT) || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'Inventario_prueba',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  }
}
