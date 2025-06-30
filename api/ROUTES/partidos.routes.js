const express = require('express');
const router = express.Router();
const PartidosController = require('../controllers/partidos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', PartidosController.getAll);
router.get('/:id', PartidosController.getById);
router.post('/', authenticateToken, PartidosController.create);
router.put('/:id', authenticateToken, PartidosController.update);
router.delete('/:id', authenticateToken, PartidosController.delete);

module.exports = router;