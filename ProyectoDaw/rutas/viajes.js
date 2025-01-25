const express = require('express');
const router = express.Router();

// Importamos el controlador de viajes
const viajesController = require('../controladores/viajes'); // Ajusta la ruta según tu estructura

// Ruta para obtener todos los viajes
router.get('/', viajesController.getAll);
router.post('/', viajesController.create);
router.put('/', viajesController.update);
router.delete('/', viajesController.delete);

module.exports = router;
