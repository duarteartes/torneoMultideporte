// IMPORTACIÓN DE LA CONEXIÓN A LA BBDD
const pool = require('../db');

// MODELO EQUIPOS
const Equipos = {
    /* Obtener todos los equipos registrados */
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM equipos');
        return rows;
    },
    /* Obtener un equipo por su ID */
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [id]);
        return rows[0];
    },
    /* Crear un nuevo equipo */
    create: async (data) => {
        const { nombre, disciplina_id, torneo_id } = data;
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
    /* Actualizar los datos de un equipo por ID */
    update: async (id, data) => {
        const { nombre, disciplina_id, torneo_id } = data;
        await pool.query(
            'UPDATE equipos SET nombre = ?, disciplina_id = ?, torneo_id = ? WHERE id = ?',
            [nombre, disciplina_id, torneo_id, id]
        );
    },
    /* Eliminar un equipo por ID */
    delete: async (id) => {
        await pool.query('DELETE FROM equipos WHERE id = ?', [id]);
    },
};

module.exports = Equipos;