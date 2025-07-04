const pool = require('../db');

const Equipos = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM equipos');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { nombre, disciplina_id, torneo_id } = data;

        // Verificar duplicado
        const [rows] = await pool.query(
            'SELECT id FROM equipos WHERE nombre = ? AND disciplina_id = ?',
            [nombre, disciplina_id]
        );

        if (rows.length > 0) {
            const error = new Error('Ya existe un equipo con ese nombre para la disciplina seleccionada');
            error.code = 'DUPLICATE_TEAM';
            throw error;
        }

        const [result] = await pool.query(
            'INSERT INTO equipos (nombre, disciplina_id, torneo_id) VALUES (?, ?, ?)',
            [nombre, disciplina_id, torneo_id]
        );
        return result.insertId;
    },


    update: async (id, data) => {
        const { nombre, disciplina_id, torneo_id } = data;
        await pool.query(
            'UPDATE equipos SET nombre = ?, disciplina_id = ?, torneo_id = ? WHERE id = ?',
            [nombre, disciplina_id, torneo_id, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM equipos WHERE id = ?', [id]);
    },
};

module.exports = Equipos;