const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
            return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
    }

    try {
        // Buscar el admin por usuario
        const [rows] = await pool.query('SELECT * FROM administradores WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            console.log(`Usuario no encontrado: ${usuario}`);
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const admin = rows[0];

        // Comprobar contraseña (asumiendo que está encriptada con bcrypt)
        const passwordMatch = await bcrypt.compare(contrasena, admin.contrasena);
        if (!passwordMatch) {
            console.log(`Contraseña incorrecta para usuario: ${usuario}`);
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Crear token JWT
        const payload = { id: admin.id, usuario: admin.usuario };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { login };