const express = require('express');
const router = express.Router();
const DisciplinasController = require('../CONTROLLERS/disciplinas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', DisciplinasController.getAll);
router.get('/:id', DisciplinasController.getById);
router.get('/anio/:anio', DisciplinasController.getByAnio);
router.get('/:id/equipos', DisciplinasController.getEquiposPorDisciplina);
router.get('/:id/partidos', DisciplinasController.getPartidosPorDisciplina);
router.post('/', authenticateToken, DisciplinasController.create);
router.put('/:id', authenticateToken, DisciplinasController.update);
router.delete('/:id', authenticateToken, DisciplinasController.delete);

module.exports = router;