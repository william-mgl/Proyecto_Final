const express = require('express');
const router = express.Router();

// Importamos el controlador de boletos
const boletosController = require('../controladores/boletos');

// Ruta para obtener todos los boletos
router.get('/', boletosController.getAll);
router.post('/', boletosController.create);
router.put('/', boletosController.update);
router.delete('/', boletosController.delete);

module.exports = router;
