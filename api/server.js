const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./initDB');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    '/cuadroEliminatorias',
    express.static(path.join(__dirname, 'uploads', 'cuadroEliminatorias'))
);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});