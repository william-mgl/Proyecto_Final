const sequelize = require("../base_datos/confi");
const { QueryTypes } = require("sequelize");

module.exports = {
    // Obtener todas las rutas
    async getAll(req, res) {
        try {
            const rutas = await sequelize.query("SELECT * FROM DAW.rutas;", { type: QueryTypes.SELECT });
            res.json(rutas);
        } catch (error) {
            console.error("Error al obtener las rutas:", error);
            res.status(500).json({ message: "Error al obtener las rutas", error });
        }
    },

    // Crear una nueva ruta
    async create(req, res) {
        const { origen, destino, duracion, precio } = req.body;

        try {
            const result = await sequelize.query(
                `INSERT INTO DAW.rutas (origen, destino, duracion, precio)
                VALUES (:origen, :destino, :duracion, :precio) RETURNING *;`,
                {
                    replacements: {
                        origen,
                        destino,
                        duracion,
                        precio
                    },
                    type: QueryTypes.SELECT
                }
            );

            res.json({ status: true, value: result, message: "Ruta creada satisfactoriamente" });
        } catch (error) {
            console.error("Error al insertar en la tabla rutas:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Actualizar una ruta
    async update(req, res) {
        const { ruta_id, origen, destino, duracion, precio } = req.body;

        if (!ruta_id) {
            return res.status(400).json({ status: false, message: "El campo 'idruta' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `UPDATE DAW.rutas
                 SET origen = :origen, destino = :destino, duracion = :duracion, precio = :precio
                 WHERE ruta_id = :ruta_id RETURNING *;`,
                {
                    replacements: {
                        ruta_id,
                        origen,
                        destino,
                        duracion,
                        precio
                    },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Ruta no encontrada" });
            }

            res.json({ status: true, value: result, message: "Ruta actualizada satisfactoriamente" });
        } catch (error) {
            console.error("Error al actualizar la ruta:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Eliminar una ruta
    async delete(req, res) {
        const { ruta_id } = req.body;

        if (!ruta_id) {
            return res.status(400).json({ status: false, message: "El campo 'idruta' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `DELETE FROM DAW.rutas WHERE ruta_id = :ruta_id RETURNING *;`,
                {
                    replacements: { ruta_id },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Ruta no encontrada" });
            }

            res.json({ status: true, message: "Ruta eliminada satisfactoriamente" });
        } catch (error) {
            console.error("Error al eliminar la ruta:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    }
};
