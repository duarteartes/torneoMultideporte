// IMPORTACIÓN DE DEPENDENCIAS Y RECURSOS
/*
Se importa Express, el controlador de torneos y el middleware para verificar el token
*/
const express = require('express');
const router = express.Router();
const TorneosController = require('../controllers/torneos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// DEFINICIÓN DE RUTAS
/*
GET para obtener todos los torneos, solo los años disponibles o un torneo por ID
POST, PUT y DELETE para crear, actualizar o eliminar torneos (con autenticación)
*/
router.get('/', TorneosController.getAll);
router.get('/anios', TorneosController.getAnios);
router.get('/:id', TorneosController.getById);
router.post('/', authenticateToken, TorneosController.create);
router.put('/:id', authenticateToken, TorneosController.update);
router.delete('/:id', authenticateToken, TorneosController.delete);

module.exports = router;