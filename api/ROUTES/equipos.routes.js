// IMPORTACIÓN DE DEPENDENCIAS Y RECURSOS
/*
Se importa Express, el controlador de equipos y el middleware
*/
const express = require('express');
const router = express.Router();
const EquiposController = require('../controllers/equipos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// DEFINICIÓN DE RUTAS
/*
GET para obtener todos los equipos o uno por ID
POST, PUT y DELETE para crear un equipo, actualizar o eliminar un equipo
*/
router.get('/', EquiposController.getAll);
router.get('/:id', EquiposController.getById);
router.post('/', EquiposController.create);
router.put('/:id', authenticateToken, EquiposController.update);
router.delete('/:id', authenticateToken, EquiposController.delete);

module.exports = router;