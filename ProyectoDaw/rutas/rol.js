const express = require("express");
const router = express.Router();
const rolController = require("../controladores/rol");

// Rutas para los métodos CRUD
router.get("/", rolController.getAll);      // Obtener todos los roles
router.post("/", rolController.create);    // Crear un rol
router.put("/", rolController.update);     // Actualizar un rol
router.delete("/", rolController.delete);  // Eliminar un rol

module.exports = router;
