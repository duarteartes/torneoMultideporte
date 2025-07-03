const pool = require('../db');

const Partidos = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM partidos');
        return rows;
    },

    getByDisciplinaYAnio: async (disciplinaId, anio) => {
        const [rows] = await pool.query(
            `SELECT p.*,
                el.nombre AS equipo_local_nombre,
                ev.nombre AS equipo_visitante_nombre
                FROM partidos p
                JOIN equipos el ON p.equipo_local_id = el.id
                JOIN equipos ev ON p.equipo_visitante_id = ev.id
                WHERE p.disciplina_id = ? AND YEAR(p.fecha) = ?`,
            [disciplinaId, anio]
        );
        return rows;
    },


    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM partidos WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const {
            torneo_id,
            disciplina_id,
            equipo_local_id,
            equipo_visitante_id,
            fase,
            resultado_local,
            resultado_visitante,
            ganador_id,
            fecha,
        } = data;

        const [result] = await pool.query(
            `INSERT INTO partidos
                (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                torneo_id,
                disciplina_id,
                equipo_local_id,
                equipo_visitante_id,
                fase,
                resultado_local,
                resultado_visitante,
                ganador_id,
                fecha,
            ]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const {
            resultado_local,
            resultado_visitante,
            ganador_id,
            fecha,
        } = data;

        await pool.query(
            `UPDATE partidos
                SET resultado_local = ?, resultado_visitante = ?, ganador_id = ?, fecha = ?
                WHERE id = ?`,
            [resultado_local, resultado_visitante, ganador_id, fecha, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM partidos WHERE id = ?', [id]);
    },
};

module.exports = Partidos;