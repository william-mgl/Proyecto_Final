const sequelize = require('../base_datos/confi');
const { QueryTypes } = require('sequelize');

module.exports = {
    // Obtener todos los autobuses
    async getAll(req, res) {
        try {
            const autobuses = await sequelize.query("SELECT * FROM DAW.autobuses;", { type: QueryTypes.SELECT });
            res.json(autobuses);
        } catch (error) {
            console.error("Error al obtener los autobuses:", error);
            res.status(500).json({ message: "Error al obtener los autobuses", error });
        }
    },

    // Crear un nuevo autobús
    async create(req, res) {
        const { modelo, capacidad,placa } = req.body;

        try {
            const result = await sequelize.query(
                `INSERT INTO DAW.autobuses (modelo, capacidad, placa)
                 VALUES (:modelo, :capacidad, :placa) RETURNING *;`,
                {
                    replacements: {  modelo, capacidad, placa },
                    type: QueryTypes.SELECT
                }
            );

            res.json({ status: true, value: result, message: "Autobús creado satisfactoriamente" });
        } catch (error) {
            console.error("Error al insertar el autobús:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Actualizar un autobús
    async update(req, res) {
        const { autobus_id, modelo, capacidad, placa } = req.body;

        if (!autobus_id) {
            return res.status(400).json({ status: false, message: "El campo 'idautobus' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `UPDATE DAW.autobuses
                 SET modelo = :modelo, capacidad = :capacidad, placa = :placa
                 WHERE autobus_id = :autobus_id RETURNING *;`,
                {
                    replacements: { autobus_id, modelo, capacidad, placa },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Autobús no encontrado" });
            }

            res.json({ status: true, value: result, message: "Autobús actualizado satisfactoriamente" });
        } catch (error) {
            console.error("Error al actualizar el autobús:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Eliminar un autobús
    async delete(req, res) {
        const { autobus_id } = req.body;

        if (!autobus_id) {
            return res.status(400).json({ status: false, message: "El campo 'idautobus' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `DELETE FROM DAW.autobuses WHERE autobus_id = :autobus_id RETURNING *;`,
                {
                    replacements: { autobus_id },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Autobús no encontrado" });
            }

            res.json({ status: true, message: "Autobús eliminado satisfactoriamente" });
        } catch (error) {
            console.error("Error al eliminar el autobús:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    }
};
