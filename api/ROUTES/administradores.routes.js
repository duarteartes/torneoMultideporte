const express = require('express');
const router = express.Router();
const AdministradoresController = require('../CONTROLLERS/administradores.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', AdministradoresController.getAll);
router.get('/:id', AdministradoresController.getById);
router.post('/', authenticateToken, AdministradoresController.create);
router.put('/:id', authenticateToken, AdministradoresController.update);
router.delete('/:id', authenticateToken, AdministradoresController.delete);

module.exports = router;