// IMPORTACIÓN DE LA CONEXIÓN A LA BBDD
const pool = require('../db');

// MODELO DISCIPLINAS
const Disciplinas = {
    /* Obtener todas las disciplinas */
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM disciplinas');
        return rows;
    },
    /* Obtener una disciplina por ID */
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM disciplinas WHERE id = ?', [id]);
        return rows[0];
    },
    /* Obtener disciplinas relacionadas con un año específico (relación a través de equipos y torneos) */
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
    /* Obtener todos los equipos asociados a una disciplina */
    getEquiposPorDisciplina: async (id) => {
        const [disciplina] = await pool.query('SELECT * FROM disciplinas WHERE id = ?', [id]);
        if (disciplina.length === 0) return [];
        const [equipos] = await pool.query('SELECT * FROM equipos WHERE disciplina_id = ?', [id]);
        return equipos;
    },
    /* Obtener todos los partidos asociados a una disciplina */
    getPartidosPorDisciplina: async (id) => {
        const [rows] = await pool.query(
            `SELECT p.*
                FROM partidos p
                WHERE p.disciplina_id = ?`,
            [id]
        );
        return rows;
    },
    /* Crear una nueva disciplina */
    create: async (data) => {
        const { nombre } = data;
        const [result] = await pool.query(
            'INSERT INTO disciplinas (nombre) VALUES (?)',
            [nombre]
        );
        return result.insertId;
    },
    /* Actualizar una disciplina por ID */
    update: async (id, data) => {
        const { nombre } = data;
        await pool.query(
            'UPDATE disciplinas SET nombre = ? WHERE id = ?',
            [nombre, id]
        );
    },
    /* Eliminar una disciplina por ID */
    delete: async (id) => {
        await pool.query('DELETE FROM disciplinas WHERE id = ?', [id]);
    },
};

module.exports = Disciplinas;