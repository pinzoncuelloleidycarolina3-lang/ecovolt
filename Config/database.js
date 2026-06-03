require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql', // XAMPP usa MySQL

        logging:
            process.env.NODE_ENV === 'development'
                ? console.log
                : false
    }
);

// Probar conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a MySQL');
    })
    .catch((error) => {
        console.error('Error de conexión:', error);
    });

module.exports = sequelize;