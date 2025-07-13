// IMPORTACIÓN DE DEPENDENCIAS Y RECURSOS
/*
Se importa Express, el controlador de partidos, y el middleware de autenticación
*/
const express = require('express');
const router = express.Router();
const PartidosController = require('../CONTROLLERS/partidos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// DEFINICIÓN DE RUTAS
/*
GET para obtener todos los partidos, por disciplina y año, por ID o ganador
POST, PUT y DELETE para crear, actualizar y eliminar partidos (requieren autenticación)
*/
router.get('/', PartidosController.getAll);
router.get('/disciplina/:disciplinaId/anio/:anio', PartidosController.getByDisciplinaYAnio);
router.get('/:id', PartidosController.getById);
router.get('/disciplina/:disciplinaId/anio/:anio/ganador', PartidosController.getGanadorPorDisciplinaYAnio);
router.post('/', authenticateToken, PartidosController.create);
router.put('/:id', authenticateToken, PartidosController.update);
router.delete('/:id', authenticateToken, PartidosController.delete);

module.exports = router;