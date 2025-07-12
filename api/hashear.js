const bcrypt = require('bcrypt');
const pool = require('./db');

async function hashearPass() {
    const passPlano = 'root';
    const hash = await bcrypt.hash(passPlano, 10);
    console.log('Hash generado:', hash);

    await pool.query('UPDATE administradores SET contrasena = ? WHERE usuario = ?', [hash, 'admin']);

    console.log('Contraseña actualizada correctamente');
    process.exit();
}

hashearPass();