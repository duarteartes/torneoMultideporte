const express = require('express');
const router = express.Router();
const AuthController = require('../CONTROLLERS/auth.controller');

router.post('/login', AuthController.login);

module.exports = router;