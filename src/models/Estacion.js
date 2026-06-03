const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Estacion = sequelize.define('Estacion', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre de la estación es obligatorio'
            },
            len: {
                args: [3, 120],
                msg: 'El nombre debe tener entre 3 y 120 caracteres'
            }
        }
    },

    ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La ubicación es obligatoria'
            }
        }
    },

    latitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
            min: {
                args: -4,
                msg: 'La latitud mínima permitida en Colombia es -4'
            },
            max: {
                args: 13,
                msg: 'La latitud máxima permitida en Colombia es 13'
            }
        }
    },

    longitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
            min: {
                args: -81,
                msg: 'La longitud mínima permitida en Colombia es -81'
            },
            max: {
                args: -66,
                msg: 'La longitud máxima permitida en Colombia es -66'
            }
        }
    },

    precioKwh: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: 100,
                msg: 'El precio por kWh no puede ser menor a 100'
            },
            max: {
                args: 5000,
                msg: 'El precio por kWh no puede ser mayor a 5000'
            }
        }
    }

}, {
    timestamps: true,
    paranoid: true,
    tableName: 'estaciones',

    hooks: {

        beforeUpdate: async (estacion) => {

            const anterior = await Estacion.findByPk(estacion.id);

            if (!anterior) return;

            const diferencia =
                Math.abs(
                    parseFloat(estacion.precioKwh) -
                    parseFloat(anterior.precioKwh)
                );

            // Evita cambios absurdos de precio
            if (diferencia > 1000) {
                throw new Error(
                    'El cambio de precio es demasiado alto'
                );
            }
        }

    }
});

module.exports = Estacion;