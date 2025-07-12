// IMPORTACIÓN DE MÓDULOS
/*
Se importa el bcrypt para manejar el hashing de contraseñas y el pool de conexión a la BBDD MySQL
*/
const bcrypt = require('bcrypt');
const pool = require('./db');

// FUNCIÓN PARA GENERAR EL HASH Y ACTUALIZAR LA CONTRASEÑA
/*
Hashear la contraseña en texto plano. Actualiza la contraseña hasheada en la consola y muestra un mensaje
de éxito para terminar con el proceso y cerrarlo
*/
async function hashearPass() {
    const passPlano = 'root';
    const hash = await bcrypt.hash(passPlano, 10);
    console.log('Hash generado:', hash);

    await pool.query('UPDATE administradores SET contrasena = ? WHERE usuario = ?', [hash, 'admin']);

    console.log('Contraseña actualizada correctamente');
    process.exit();
}

hashearPass();