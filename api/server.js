const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const torneosRoutes = require('./routes/torneos.routes');
const disciplinasRoutes = require('./routes/disciplinas.routes');
const equiposRoutes = require('./routes/equipos.routes');
const partidosRoutes = require('./routes/partidos.routes');
const administradoresRoutes = require('./routes/administradores.routes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/torneos', torneosRoutes);
app.use('/api/disciplinas', disciplinasRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/partidos', partidosRoutes);
app.use('/api/administradores', administradoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});