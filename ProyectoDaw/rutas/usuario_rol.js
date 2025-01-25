const express = require("express");
const router = express.Router();
const usuarioRolController = require("../controladores/usuario_rol");


router.get("/", usuarioRolController.getAll);

module.exports = router;
