// IMPORTACIÓN DE LA CONEXIÓN A LA BBDD
const pool = require('../db');

// MODELO TORNEOS
const Torneos = {
    /* Obtener todos los torneos */
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM torneos');
        return rows;
    },
    /* Obtener todos los años distintos de los torneos, ordenados de más reciente a más antiguo */
    getAnios: async () => {
        const [rows] = await pool.query('SELECT DISTINCT anio FROM torneos ORDER BY anio DESC');
        return rows.map(row => row.anio);
    },
    /* Obtener un torneo por su ID */
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM torneos WHERE id = ?', [id]);
        return rows[0];
    },
    /* Crear un nuevo torneo */
    create: async (data) => {
        const { anio, nombre } = data;
        const [result] = await pool.query(
            'INSERT INTO torneos (anio, nombre) VALUES (?, ?)',
            [anio, nombre]
        );
        return result.insertId;
    },
    /* Actualizar un torneo existente por ID */
    update: async (id, data) => {
        const { anio, nombre } = data;
        await pool.query(
            'UPDATE torneos SET anio = ?, nombre = ? WHERE id = ?',
            [anio, nombre, id]
        );
    },
    /* Eliminar un torneo por ID */
    delete: async (id) => {
        await pool.query('DELETE FROM torneos WHERE id = ?', [id]);
    },
};

module.exports = Torneos;