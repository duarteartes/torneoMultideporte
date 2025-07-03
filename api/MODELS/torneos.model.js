const pool = require('../db');

const Torneos = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM torneos');
        return rows;
    },

    getAnios: async () => {
        const [rows] = await pool.query('SELECT DISTINCT anio FROM torneos ORDER BY anio DESC');
        return rows.map(row => row.anio);
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM torneos WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { anio, nombre } = data;
        const [result] = await pool.query(
            'INSERT INTO torneos (anio, nombre) VALUES (?, ?)',
            [anio, nombre]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { anio, nombre } = data;
        await pool.query(
            'UPDATE torneos SET anio = ?, nombre = ? WHERE id = ?',
            [anio, nombre, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM torneos WHERE id = ?', [id]);
    },
};

module.exports = Torneos;