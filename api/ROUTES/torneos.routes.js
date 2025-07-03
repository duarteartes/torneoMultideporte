const express = require('express');
const router = express.Router();
const TorneosController = require('../controllers/torneos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', TorneosController.getAll);
router.get('/anios', TorneosController.getAnios);
router.get('/:id', TorneosController.getById);
router.post('/', authenticateToken, TorneosController.create);
router.put('/:id', authenticateToken, TorneosController.update);
router.delete('/:id', authenticateToken, TorneosController.delete);

module.exports = router;