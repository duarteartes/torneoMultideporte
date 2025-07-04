const bcrypt = require('bcrypt');
const pool = require('./db'); // ajusta la ruta si hace falta

async function hashearPass() {
    const passPlano = 'root';
    const hash = await bcrypt.hash(passPlano, 10);
    console.log('Hash generado:', hash);
    
    // Actualizar la contraseña en la BBDD
    await pool.query('UPDATE administradores SET contrasena = ? WHERE usuario = ?', [hash, 'admin']);
    
    console.log('Contraseña actualizada correctamente');
    process.exit();
}

hashearPass();