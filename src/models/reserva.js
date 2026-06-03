module.exports = (sequelize, DataTypes) => {

  const Reserva = sequelize.define('Reserva', {

    fecha_reserva: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },

    estado: {
      type: DataTypes.ENUM(
        'pendiente',
        'confirmada',
        'cancelada',
        'finalizada'
      ),
      defaultValue: 'pendiente'
    },

    total_pagar: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        min: 0
      }
    }

  });

  return Reserva;
};