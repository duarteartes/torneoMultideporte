const pool = require('../db');

const Administradores = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT id, usuario FROM administradores');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT id, usuario FROM administradores WHERE id = ?', [id]);
        return rows[0];
    },

    getByUsuario: async (usuario) => {
        const [rows] = await pool.query('SELECT * FROM administradores WHERE usuario = ?', [usuario]);
        return rows[0];
    },

    create: async (data) => {
        const { usuario, contrasena } = data;
        const [result] = await pool.query(
            'INSERT INTO administradores (usuario, contrasena) VALUES (?, ?)',
            [usuario, contrasena]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { contrasena } = data;
        await pool.query(
            'UPDATE administradores SET contrasena = ? WHERE id = ?',
            [contrasena, id]
        );
    },

    delete: async (id) => {
        await pool.query('DELETE FROM administradores WHERE id = ?', [id]);
    },
};

module.exports = Administradores;