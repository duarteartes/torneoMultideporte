const express = require('express');
const router = express.Router();
const PartidosController = require('../CONTROLLERS/partidos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', PartidosController.getAll);
router.get('/disciplina/:disciplinaId/anio/:anio', PartidosController.getByDisciplinaYAnio);
router.get('/:id', PartidosController.getById);
router.post('/', authenticateToken, PartidosController.create);
router.put('/:id', authenticateToken, PartidosController.update);
router.delete('/:id', authenticateToken, PartidosController.delete);

module.exports = router;