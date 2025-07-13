// IMPORTACIÓN DE DEPENDENCIAS Y RECURSOS
/*
Se importa Express para crear el router, el controlador de Administradores con la lógica de las
operaciones CRUD, y el middleware para verificar el token JWT en rutas protegidas
*/
const express = require('express');
const router = express.Router();
const AdministradoresController = require('../CONTROLLERS/administradores.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// DEFINICIÓN DE RUTAS
/*
GET para obtener todos o un administrador específico
POST, PUT Y DELETE para crear, actualizar o eliminar administradores. Requieren autenticación JWT
*/
router.get('/', AdministradoresController.getAll);
router.get('/:id', AdministradoresController.getById);
router.post('/', authenticateToken, AdministradoresController.create);
router.put('/:id', authenticateToken, AdministradoresController.update);
router.delete('/:id', authenticateToken, AdministradoresController.delete);

module.exports = router;