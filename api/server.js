// DEPENDENCIAS Y CONFIGURACIÓN BASE
/*
Se importan módulos necesarios: Express para el servidor, CORS para el control de acceso, Path para gestionar
rutas de archivos, dotenv para variables de entorno, y se inicializa la BBDD
*/
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./initDB');

// INICIALIZACIÓN DE LA APLICACIÓN EXPRESS
const app = express();

//MIDDLEWARES GLOBALES
/*
Se habilita CORS para permitir peticiones desde otros orígenes y se configura Express para interpretar
solicitudes con cuerpo en formato JSON
*/
app.use(cors());
app.use(express.json());

// SERVIR ARCHIVOS ESTÁTICOS
/*
Se exponen carpetas específicas para servir imágenes o documentos subidos, accesibles mediante rutas públicas
*/
app.use(
    '/cuadroEliminatorias',
    express.static(path.join(__dirname, 'uploads', 'cuadroEliminatorias'))
);
app.use(
    '/ganadores',
    express.static(path.join(__dirname, 'uploads', 'ganadores'))
);

// DEFINICIÓN DE RUTAS DE LA API
/*
Se importan y montan los diferentes módulos de las rutas de la aplicación, organizados por funcionalidad
*/
const authRoutes = require('./ROUTES/auth.routes');
const torneosRoutes = require('./routes/torneos.routes');
const disciplinasRoutes = require('./routes/disciplinas.routes');
const equiposRoutes = require('./routes/equipos.routes');
const partidosRoutes = require('./routes/partidos.routes');
const administradoresRoutes = require('./ROUTES/administradores.routes');
const uploadsRoutes = require('./ROUTES/uploads.routes');

app.use('/api/auth', authRoutes);
app.use('/api/torneos', torneosRoutes);
app.use('/api/disciplinas', disciplinasRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/partidos', partidosRoutes);
app.use('/api/administradores', administradoresRoutes);
app.use('/api/uploads', uploadsRoutes);

// INICIO DEL SERVIDOR
/*
Se define el puerto de escucha y se arranca el servidor, mostrando un mensaje en consola para confirmar su ejecución
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});