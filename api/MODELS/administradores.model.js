// IMPORTACIÓN DE LA CONEXIÓN A LA BBDD
const pool = require('../db');

// MODELO ADMINISTRADORES
const Administradores = {
    /* Obtener todos los administradores (solo ID y usuario)*/
    getAll: async () => {
        const [rows] = await pool.query('SELECT id, usuario FROM administradores');
        return rows;
    },
    /* Obtener un administrador por ID */
    getById: async (id) => {
        const [rows] = await pool.query('SELECT id, usuario FROM administradores WHERE id = ?', [id]);
        return rows[0];
    },
    /* Obtener un administrador por nombre de usuario */
    getByUsuario: async (usuario) => {
        const [rows] = await pool.query('SELECT * FROM administradores WHERE usuario = ?', [usuario]);
        return rows[0];
    },
    /* Crear un nuevo administrador con usuario y contraseña */
    create: async (data) => {
        const { usuario, contrasena } = data;
        const [result] = await pool.query(
            'INSERT INTO administradores (usuario, contrasena) VALUES (?, ?)',
            [usuario, contrasena]
        );
        return result.insertId;
    },
    /* Actualizar la contraseña de un administrador por ID */
    update: async (id, data) => {
        const { contrasena } = data;
        await pool.query(
            'UPDATE administradores SET contrasena = ? WHERE id = ?',
            [contrasena, id]
        );
    },
    /* Eliminar un administrador por ID */
    delete: async (id) => {
        await pool.query('DELETE FROM administradores WHERE id = ?', [id]);
    },
};

module.exports = Administradores;