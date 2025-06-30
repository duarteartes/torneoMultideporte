const express = require('express');
const router = express.Router();
const DisciplinasController = require('../controllers/disciplinas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', DisciplinasController.getAll);
router.get('/:id', DisciplinasController.getById);
router.post('/', authenticateToken, DisciplinasController.create);
router.put('/:id', authenticateToken, DisciplinasController.update);
router.delete('/:id', authenticateToken, DisciplinasController.delete);

module.exports = router;