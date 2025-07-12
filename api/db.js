//IMPORTACIÓN DE DEPENDENCIAS Y CONFIGURACIÓN
/*
Se importa el cliente MySQL con soporte para promesas y se carga la configuración de variables de entorno
*/
const mysql = require('mysql2/promise');
require('dotenv').config();

// CREACIÓN DEL POOL DE CONEXIONES
/*
Se configura un pool de conexiones a la base de datos de MySQL, usando los parámetros definidos en las variables
de entorno. Maneja hasta 20 conexiones simultáneas y espera si no hay conexiones disponibles
*/
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

module.exports = pool;