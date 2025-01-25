const sequelize = require('../base_datos/confi');
const { QueryTypes } = require('sequelize');

module.exports = {
    // Obtener todos los viajes
    async getAll(req, res) {
        try {
            const viajes = await sequelize.query("SELECT * FROM DAW.viajes;", { type: QueryTypes.SELECT });
            res.json(viajes);
        } catch (error) {
            console.error("Error al obtener los viajes:", error);
            res.status(500).json({ message: "Error al obtener los viajes", error });
        }
    },

    // Crear un nuevo viaje
    async create(req, res) {
        const { idautobus, idorigen, iddestino, fecha_salida, fecha_llegada, costo } = req.body;

        try {
            const result = await sequelize.query(
                `INSERT INTO DAW.viajes (idautobus, idorigen, iddestino, fecha_salida, fecha_llegada, costo)
                 VALUES (:idautobus, :idorigen, :iddestino, :fecha_salida, :fecha_llegada, :costo) RETURNING *;`,
                {
                    replacements: { idautobus, idorigen, iddestino, fecha_salida, fecha_llegada, costo },
                    type: QueryTypes.SELECT
                }
            );

            res.json({ status: true, value: result, message: "Viaje creado satisfactoriamente" });
        } catch (error) {
            console.error("Error al insertar el viaje:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Actualizar un viaje
    async update(req, res) {
        const { idviaje, idautobus, idorigen, iddestino, fecha_salida, fecha_llegada, costo } = req.body;

        if (!idviaje) {
            return res.status(400).json({ status: false, message: "El campo 'idviaje' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `UPDATE DAW.viajes
                 SET idautobus = :idautobus, idorigen = :idorigen, iddestino = :iddestino, 
                     fecha_salida = :fecha_salida, fecha_llegada = :fecha_llegada, costo = :costo
                 WHERE idviaje = :idviaje RETURNING *;`,
                {
                    replacements: { idviaje, idautobus, idorigen, iddestino, fecha_salida, fecha_llegada, costo },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Viaje no encontrado" });
            }

            res.json({ status: true, value: result, message: "Viaje actualizado satisfactoriamente" });
        } catch (error) {
            console.error("Error al actualizar el viaje:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Eliminar un viaje
    async delete(req, res) {
        const { idviaje } = req.body;

        if (!idviaje) {
            return res.status(400).json({ status: false, message: "El campo 'idviaje' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `DELETE FROM DAW.viajes WHERE idviaje = :idviaje RETURNING *;`,
                {
                    replacements: { idviaje },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Viaje no encontrado" });
            }

            res.json({ status: true, message: "Viaje eliminado satisfactoriamente" });
        } catch (error) {
            console.error("Error al eliminar el viaje:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    }
};
