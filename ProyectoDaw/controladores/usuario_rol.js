const sequelize = require("../base_datos/confi");
const { QueryTypes } = require("sequelize");

module.exports = {
    // Obtener todos los registros de usuario_rol
    async getAll(req, res) {
        try {
            const usuarioRoles = await sequelize.query("SELECT * FROM DAW.usuario_rol;", { type: QueryTypes.SELECT });
            res.json(usuarioRoles);
        } catch (error) {
            console.error("Error al obtener los registros de usuario_rol:", error);
            res.status(500).json({ message: "Error al obtener los registros", error });
        }
    }
}