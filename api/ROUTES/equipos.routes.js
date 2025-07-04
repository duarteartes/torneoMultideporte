const express = require('express');
const router = express.Router();
const EquiposController = require('../controllers/equipos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', EquiposController.getAll);
router.get('/:id', EquiposController.getById);
router.post('/', EquiposController.create);
router.put('/:id', authenticateToken, EquiposController.update);
router.delete('/:id', authenticateToken, EquiposController.delete);

module.exports = router;