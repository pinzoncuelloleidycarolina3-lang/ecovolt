const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Usuario = sequelize.define('Usuario', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    nombreCompleto: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre completo es obligatorio'
            },
            len: {
                args: [3, 100],
                msg: 'El nombre debe tener entre 3 y 100 caracteres'
            }
        }
    },

    correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: {
            msg: 'El correo ya está registrado'
        },
        validate: {
            isEmail: {
                msg: 'Debe ingresar un correo válido'
            },
            notEmpty: {
                msg: 'El correo es obligatorio'
            }
        }
    },

    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            is: {
                args: /^[0-9+\-\s()]+$/i,
                msg: 'Número de teléfono inválido'
            }
        }
    },

    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña es obligatoria'
            },
            len: {
                args: [6, 100],
                msg: 'La contraseña debe tener mínimo 6 caracteres'
            }
        }
    },

    ciudadResidencia: {
        type: DataTypes.STRING(100),
        allowNull: true
    }

}, {
    timestamps: true,
    paranoid: true, // Soft Delete
    tableName: 'usuarios',

    hooks: {

        afterDestroy: async (Usuario) => {
         
            const Reserva = requiere ('./resrva');
            await Reservs.update(
                { estado: 'cancelada' },
                { where: { id_usuario: Usuario.id,
                    estado : ['pendiente', 'confirmada']
                 } }
            );  
        }
    }
});

module.exports = Usuario;