const express = require('express');
const router = express.Router();

const autobusesController = require('../controladores/autobuses'); // Ajusta la ruta según tu estructura


router.get('/', autobusesController.getAll);
router.post('/', autobusesController.create);
router.put('/', autobusesController.update);
router.delete('/', autobusesController.delete);

module.exports = router;
