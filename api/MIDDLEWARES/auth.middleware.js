// IMPORTACIÓN DE DEPENDENCIAS
/*
Se importa jsonwebtoken para verificar y decodificar tokens JWT
*/
const jwt = require('jsonwebtoken');

// MIDDLEWARE DE AUTENTICACIÓN JWT
/*
Extraemos el token del encabezado de Authorization y verificamos si el token existe. Validamos el token usando
la clave secreta, si es válido añadimos el usuario decodificado a la request, si no es válido devuelve un error
*/
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;