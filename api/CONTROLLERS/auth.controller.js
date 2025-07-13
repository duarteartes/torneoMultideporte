// IMPORTACIONES DE DEPENDENCIAS Y CONFIGURACIÓN
/*
Importamos el pool de conexiones con la configuración de conexión a la BBDD. Importamos la librería JWT para
firmar y verificar tokens. Importamos bcrypt para comparar contraseñas encriptadas
*/
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// CONTROLADOR DE LOGIN
/*
Verificamos las credenciales de un administrador: recibe el usuario y contraseña, comprueba que existan en la
BBDD, y que la contraseña se correcta usando bcrypt; si todo es válido, genera y devuelve un token JWT para
autenticar sesiones futuras
*/
const login = async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
            return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM administradores WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            console.log(`Usuario no encontrado: ${usuario}`);
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const admin = rows[0];
        const passwordMatch = await bcrypt.compare(contrasena, admin.contrasena);
        if (!passwordMatch) {
            console.log(`Contraseña incorrecta para usuario: ${usuario}`);
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const payload = { id: admin.id, usuario: admin.usuario };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { login };