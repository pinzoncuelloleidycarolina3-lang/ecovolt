

module.exports = (sequelize, DataTypes) => {

  const Conector = sequelize.define('Conector', {

    codigo_fisico: {
      type: DataTypes.STRING,
      unique: true
    },

    tipo_conector: {
      type: DataTypes.ENUM(
        'CCS2',
        'CHAdeMO',
        'Tipo1',
        'Tipo2'
      )
    },

    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  });

  return Conector;
};