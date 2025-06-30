const pool = require('../db');

const Disciplinas = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM disciplinas');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM disciplinas WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { nombre } = data;
        const [result] = await pool.query(
            'INSERT INTO disciplinas (nombre) VALUES (?)',
            [nombre]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { nombre } = data;
        await pool.query(
            'UPDATE disciplinas SET nombre = ? WHERE id = ?',
            [nombre, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM disciplinas WHERE id = ?', [id]);
    },
};

module.exports = Disciplinas;