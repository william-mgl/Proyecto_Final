const Sequelize = require("sequelize");

// Configura la conexión a la base de datos
const sequelize = new Sequelize("Proyectodesa", "postgres", "12345..", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
