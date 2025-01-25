const express = require('express');
const router = express.Router();

const rutasController = require('../controladores/rutas');  // Ajusta la ruta según tu estructura

router.get('/', rutasController.getAll);
router.post('/', rutasController.create);
router.put('/', rutasController.update);
router.delete('/', rutasController.delete);

module.exports = router;
