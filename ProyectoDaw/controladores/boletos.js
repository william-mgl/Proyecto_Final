const sequelize = require('../base_datos/confi');
const { QueryTypes } = require('sequelize');

module.exports = {
    // Obtener todos los boletos
    async getAll(req, res) {
        try {
            const boletos = await sequelize.query("SELECT * FROM DAW.Boletos;", { type: QueryTypes.SELECT });
            res.json(boletos);
        } catch (error) {
            console.error("Error al obtener los boletos:", error);
            res.status(500).json({ message: "Error al obtener los boletos", error });
        }
    },

    // Crear un nuevo boleto
    async create(req, res) {
        const { cliente_id, viaje_id, asiento_num, fecha_compra, tipo_boleto } = req.body;

        try {
            const result = await sequelize.query(
                `INSERT INTO DAW.Boletos (cliente_id, viaje_id, asiento_num, fecha_compra, tipo_boleto)
                 VALUES (:cliente_id, :viaje_id, :asiento_num, :fecha_compra, :tipo_boleto) RETURNING *;`,
                {
                    replacements: { cliente_id, viaje_id, asiento_num, fecha_compra, tipo_boleto },
                    type: QueryTypes.SELECT
                }
            );

            res.json({ status: true, value: result, message: "Boleto creado satisfactoriamente" });
        } catch (error) {
            console.error("Error al insertar el boleto:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Actualizar un boleto
    async update(req, res) {
        const { boleto_id, cliente_id, viaje_id, asiento_num, fecha_compra, tipo_boleto } = req.body;

        if (!boleto_id) {
            return res.status(400).json({ status: false, message: "El campo 'boleto_id' es requerido" });
        }

        try {
            const result = await sequelize.query(
                `UPDATE DAW.Boletos
                 SET cliente_id = :cliente_id, viaje_id = :viaje_id, asiento_num = :asiento_num,
                     fecha_compra = :fecha_compra, tipo_boleto = :tipo_boleto
                 WHERE boleto_id = :boleto_id RETURNING *;`,
                {
                    replacements: { boleto_id, cliente_id, viaje_id, asiento_num, fecha_compra, tipo_boleto },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Boleto no encontrado" });
            }

            res.json({ status: true, value: result, message: "Boleto actualizado satisfactoriamente" });
        } catch (error) {
            console.error("Error al actualizar el boleto:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    },

    // Eliminar un boleto
    async delete(req, res) {
        const { boleto_id } = req.body;

        if (!boleto_id) {
            return res.status(400).json({ status: false, message: "El campo 'boleto_id' es requerido" });
        }

        try {
            const result = await sequelize.query(
                 `DELETE FROM DAW.Boletos WHERE boleto_id = :boleto_id RETURNING *; `,
                {
                    replacements: { boleto_id },
                    type: QueryTypes.SELECT
                }
            );

            if (result.length === 0) {
                return res.status(404).json({ status: false, message: "Boleto no encontrado" });
            }

            res.json({ status: true, message: "Boleto eliminado satisfactoriamente" });
        } catch (error) {
            console.error("Error al eliminar el boleto:", error);
            res.status(500).json({ status: false, error: error.name, message: error.message });
        }
    }
};