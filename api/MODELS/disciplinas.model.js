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

    getByAnio: async (anio) => {
        const [rows] = await pool.query(
            `SELECT DISTINCT d.*
                FROM disciplinas d
                JOIN equipos e ON e.disciplina_id = d.id
                JOIN torneos t ON e.torneo_id = t.id
                WHERE t.anio = ?`,
            [anio]
        );
        return rows;
    },

    getEquiposPorDisciplina: async (id) => {
        const [disciplina] = await pool.query('SELECT * FROM disciplinas WHERE id = ?', [id]);
        if (disciplina.length === 0) return [];
        const [equipos] = await pool.query('SELECT * FROM equipos WHERE disciplina_id = ?', [id]);
        return equipos;
    },

    getPartidosPorDisciplina: async (id) => {
        const [rows] = await pool.query(
            `SELECT p.*
                FROM partidos p
                WHERE p.disciplina_id = ?`,
            [id]
        );
        return rows;
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