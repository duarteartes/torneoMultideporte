// IMPORTACIÓN DE DEPENDENCIAS Y CONFIGURACIÓN
/*
Cliente MySQL con soporte para promesas y carga de variables de entorno
*/
const mysql = require('mysql2/promise');
require('dotenv').config();

// FUNCIÓN AUTOEJECUTABLE PARA CREAR BASE DE DATOS Y TABLAS
(async () => {
    try {
        /*
        Se conecta al servidor MySQL usando credenciales de entorno, sin seleccionar BBDD porque la vamos a crear
        */
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            // Permite ejecutar varias sentencias SQL en una sola consulta
            multipleStatements: true
        });

        console.log('Conexión establecida ✔️');

        // SENTENCIAS SQL PARA CREAR LA BBDD Y LAS TABLAS
        /*
        Se crea la BBDD si no existe, luego se selecciona para trabajar con ella. Después se crean tablas
        relacionadas, todas con sus claves primarias, relaciones y restricciones
        */
        const createDbAndTables = `
            CREATE DATABASE IF NOT EXISTS torneoMultideporte CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
            USE torneoMultideporte;

            CREATE TABLE IF NOT EXISTS torneos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                anio YEAR NOT NULL,
                nombre VARCHAR(100)
            );

            CREATE TABLE IF NOT EXISTS disciplinas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS equipos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                disciplina_id INT NOT NULL,
                torneo_id INT NOT NULL,
                FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT,
                FOREIGN KEY (torneo_id) REFERENCES torneos(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT
            );

            CREATE TABLE IF NOT EXISTS partidos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                torneo_id INT NOT NULL,
                disciplina_id INT NOT NULL,
                equipo_local_id INT NOT NULL,
                equipo_visitante_id INT NOT NULL,
                fase VARCHAR(50) NOT NULL,
                resultado_local INT DEFAULT NULL,
                resultado_visitante INT DEFAULT NULL,
                ganador_id INT DEFAULT NULL,
                fecha DATETIME DEFAULT NULL,
                FOREIGN KEY (torneo_id) REFERENCES torneos(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT,
                FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT,
                FOREIGN KEY (equipo_local_id) REFERENCES equipos(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT,
                FOREIGN KEY (equipo_visitante_id) REFERENCES equipos(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT,
                FOREIGN KEY (ganador_id) REFERENCES equipos(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT
            );

            CREATE TABLE IF NOT EXISTS administradores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario VARCHAR(50) NOT NULL UNIQUE,
                contrasena VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS cuadros_eliminatorios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                ruta VARCHAR(255) NOT NULL,
                disciplina_id INT NOT NULL,
                torneo_id INT NOT NULL,
                fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
                    ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (torneo_id) REFERENCES torneos(id)
                    ON UPDATE CASCADE ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS ganadores_imagenes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                ruta VARCHAR(255) NOT NULL,
                disciplina_id INT NOT NULL,
                torneo_id INT NOT NULL,
                fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
                    ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (torneo_id) REFERENCES torneos(id)
                    ON UPDATE CASCADE ON DELETE CASCADE
            );
        `;

        /*
        Se ejecuta la cadena con las sentencias SQL para crear la BBDD y las tablas
        */
        await connection.query(createDbAndTables);

        console.log('Base de datos y tablas creadas correctamente 🎉');
        // CIERRE DE LA CONEXIÓN
        await connection.end();
    } catch (err) {
        console.error('Error al crear la BBDD:', err);
    }
})();