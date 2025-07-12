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

    getGanadorPorDisciplinaYAnio: async (disciplinaId, anio) => {
        const [rows] = await pool.query(
            `SELECT p.ganador_id, e.nombre AS equipo_ganador_nombre
                FROM partidos p
                JOIN equipos e ON p.ganador_id = e.id
                WHERE p.disciplina_id = ? AND YEAR(p.fecha) = ? AND p.fase = 'Final'
                LIMIT 1`,
                [disciplinaId, anio]
        );
        return rows.length > 0 ? rows[0] : null;
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
        const [rows] = await pool.query(
            `SELECT YEAR(fecha) as anio FROM partidos WHERE id = ?`,
            [id]
        );
        if (rows.length === 0) {
            throw new Error('Partido no encontrado');
        }
        const partidoAnio = rows[0].anio;
        const anioActual = new Date().getFullYear();
        if (partidoAnio !== anioActual) {
            throw new Error(`Solo se pueden modificar partidos del año en curso (${anioActual})`);
        }
        const fechaFormateada = formatFecha(fecha);
        await pool.query(
            `UPDATE partidos
                SET resultado_local = ?, resultado_visitante = ?, ganador_id = ?, fecha = ?
                WHERE id = ?`,
            [resultado_local, resultado_visitante, ganador_id, fechaFormateada, id]
        );
    },

    delete: async (id) => {
        const [rows] = await pool.query(
            `SELECT YEAR(fecha) as anio FROM partidos WHERE id = ?`,
            [id]
        );
        if (rows.length === 0) {
            throw new Error('Partido no encontrado');
        }
        const partidoAnio = rows[0].anio;
        const anioActual = new Date().getFullYear();
        if (partidoAnio !== anioActual) {
            throw new Error(`Solo se pueden eliminar partidos del año en curso (${anioActual})`);
        }
        await pool.query('DELETE FROM partidos WHERE id = ?', [id]);
    }
};

const formatFecha = (isoString) => {
    const fecha = new Date(isoString);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const seconds = String(fecha.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = Partidos;