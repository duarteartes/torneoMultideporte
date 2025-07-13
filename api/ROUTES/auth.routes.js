// IMPORTACIÓN DE DEPENDENCIAS Y RECURSOS
/*
Importamos Express para crear el router y el controlador de autenticación
*/
const express = require('express');
const router = express.Router();
const AuthController = require('../CONTROLLERS/auth.controller');

// DEFINICIÓN DE RUTAS
/*
POST para manejar la autenticación de usuarios
*/
router.post('/login', AuthController.login);

module.exports = router;