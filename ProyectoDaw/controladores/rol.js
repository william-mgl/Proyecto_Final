const sequelize = require("../base_datos/confi");
const { QueryTypes } = require("sequelize");

module.exports = {
    // Obtener todos los roles
    async getAll(req, res) {
        try {
            const roles = await sequelize.query("SELECT * FROM DAW.rol;", { type: QueryTypes.SELECT });
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los roles", error });
        }
    },

    // Crear un rol
    async create(req, res) {
        const { nombre_rol } = req.body;
        try {
            const result = await sequelize.query(
                `INSERT INTO DAW.rol (nombre_rol)
                 VALUES (:nombre_rol) RETURNING *;`,
                {
                    replacements: { nombre_rol },
                    type: QueryTypes.SELECT,
                }
            );
            res.json({ status: true, value: result, message: "Rol creado satisfactoriamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el rol", error });
        }
    },

    // Actualizar un rol
    async update(req, res) {
        const { rol_id, nombre_rol} = req.body;
        try {
            const result = await sequelize.query(
                `UPDATE DAW.rol
                 SET nombre_rol = :nombre_rol,
                    
                 WHERE rol_id = :rol_id RETURNING *;`,
                {
                    replacements: { rol_id, nombre_rol },
                    type: QueryTypes.SELECT,
                }
            );
            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Rol no encontrado" });
            }
            res.json({ status: true, value: result, message: "Rol actualizado satisfactoriamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el rol", error });
        }
    },

    // Eliminar un rol
    async delete(req, res) {
        const { rol_id } = req.body;
        try {
            const result = await sequelize.query(
                `DELETE FROM DAW.rol WHERE rol_id = :rol_id RETURNING *;`,
                {
                    replacements: { rol_id },
                    type: QueryTypes.SELECT,
                }
            );
            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Rol no encontrado" });
            }
            res.json({ status: true, message: "Rol eliminado satisfactoriamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el rol", error });
        }
    },
};
