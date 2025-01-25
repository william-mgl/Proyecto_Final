const express = require('express');
const router = express.Router();
const usuarioController = require("../controladores/usuario");

// Rutas para la tabla usuario
router.get('/', usuarioController.getAll);         // GET: Obtener todos los usuarios
router.post('/', usuarioController.create);        // POST: Crear un nuevo usuario
router.put('/', usuarioController.update);         // PUT: Actualizar un usuario
router.delete('/', usuarioController.delete);      // DELETE: Eliminar un usuario

module.exports = router;
