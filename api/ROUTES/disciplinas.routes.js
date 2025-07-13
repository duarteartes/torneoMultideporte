// IMPORTACIÓN DE DEPENDENCIAS Y RECURSOS
/*
Importamos Express, creamos el router, e importamos el controlador de disciplinas y el middleware
*/
const express = require('express');
const router = express.Router();
const DisciplinasController = require('../CONTROLLERS/disciplinas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// DEFINICIÓN DE RUTAS
/*
GET para obtener todas y una por ID o año. Obtener equipos y partidos relacionados con una disciplina
POST, PUT y DELETE para crear, actualizar, y eliminar disciplinas (protegidas con autenticación)
*/
router.get('/', DisciplinasController.getAll);
router.get('/:id', DisciplinasController.getById);
router.get('/anio/:anio', DisciplinasController.getByAnio);
router.get('/:id/equipos', DisciplinasController.getEquiposPorDisciplina);
router.get('/:id/partidos', DisciplinasController.getPartidosPorDisciplina);
router.post('/', authenticateToken, DisciplinasController.create);
router.put('/:id', authenticateToken, DisciplinasController.update);
router.delete('/:id', authenticateToken, DisciplinasController.delete);

module.exports = router;