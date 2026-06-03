const sequelize = require('./Config/database');

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a MySQL');
    })
    .catch((error) => {
        console.error('Error de conexión:', error);
    });