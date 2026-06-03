const sequelize = require('../../Config/database');

const crearReserva = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {

        // Validar conector
        // Validar reserva existente
        // Crear reserva
        // Actualizar conector

        await transaction.commit();

        return res.status(201).json({
            mensaje: 'Reserva creada correctamente'
        });

    } catch (error) {

        await transaction.rollback();

        return res.status(500).json({
            mensaje: error.message
        });
    }

};

module.exports = { crearReserva };