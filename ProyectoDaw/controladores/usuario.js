const sequelize = require("../base_datos/confi");
const { QueryTypes } = require("sequelize");

module.exports = {
    // Obtener todos los usuarios
    async getAll(req, res) {
        try {
            const users = await sequelize.query(
                `SELECT usuario_id, nombre, apellido1, apellido2, correo, telefono FROM DAW.Usuario;`, 
                { type: QueryTypes.SELECT }
            );
            res.json(users);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            res.status(500).json({
                status: false,
                error: error.name,
                message: error.message
            });
        }
    },

    // Crear un nuevo usuario
    async create(req, res) {
        const { nombre, apellido1, apellido2, correo, telefono } = req.body;

        try {
            const result = await sequelize.query(
                `INSERT INTO DAW.Usuario (nombre, apellido1, apellido2, correo, telefono)
                 VALUES (:nombre, :apellido1, :apellido2, :correo, :telefono) RETURNING *;`,
                {
                    replacements: { nombre, apellido1, apellido2, correo, telefono },
                    type: QueryTypes.SELECT
                }
            );

            res.json({ status: true, value: result, message: "Usuario creado satisfactoriamente" });
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            res.status(500).json({
                status: false,
                error: error.name,
                message: error.message
            });
        }
    },

    // Actualizar un usuario
    async update(req, res) {
        const { usuario_id, nombre, apellido1, apellido2, correo, telefono } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ status: false, message: "El campo 'usuario_id' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `UPDATE DAW.Usuario
                 SET nombre = :nombre,
                     apellido1 = :apellido1,
                     apellido2 = :apellido2,
                     correo = :correo,
                     telefono = :telefono
                 WHERE usuario_id = :usuario_id RETURNING *;`,
                {
                    replacements: { usuario_id, nombre, apellido1, apellido2, correo, telefono },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Usuario no encontrado" });
            }

            res.json({ status: true, value: result, message: "Usuario actualizado satisfactoriamente" });
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            res.status(500).json({
                status: false,
                error: error.name,
                message: error.message
            });
        }
    },

    // Eliminar un usuario
    async delete(req, res) {
        const { usuario_id } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ status: false, message: "El campo 'usuario_id' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `DELETE FROM DAW.Usuario WHERE usuario_id = :usuario_id RETURNING *;`,
                {
                    replacements: { usuario_id },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Usuario no encontrado" });
            }

            res.json({ status: true, message: "Usuario eliminado satisfactoriamente" });
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            res.status(500).json({
                status: false,
                error: error.name,
                message: error.message
            });
        }
    }
};
