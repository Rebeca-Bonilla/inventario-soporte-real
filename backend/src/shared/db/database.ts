import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '', // contraseña vacía confirmada
  database: 'Inventario_prueba',
  waitForConnections: true,
  connectionLimit: 10
})
