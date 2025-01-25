const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./base_datos/confi"); // Archivo de configuración de la base de datos
const usuariorutas = require("./rutas/usuario"); // Rutas para usuarios
const rolrutas = require("./rutas/rol"); // Rutas para rol
const usuario_rol = require("./rutas/usuario_rol"); // Rutas para usuario_rol
const rutasru = require("./rutas/rutas"); // Rutas para rutas 
const autobusesrutas = require("./rutas/autobuses"); // Rutas para autobuses 
const viajesrutas = require("./rutas/viajes"); // Rutas para viajes 
const boletorutas = require("./rutas/boletos"); // Rutas para boletos 
const cors = require('cors');


// Función para conectar a la base de datos
async function conectar_base() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida exitosamente.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
}

// Llamar a la función para conectar a la base de datos
conectar_base();

app.use(cors({
    origin: 'http://localhost:4200', // Permitir solo este origen (tu frontend Angular)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));


app.use(bodyParser.json());


// Configuración de rutas
app.use("/api/usuario", usuariorutas); // Ruta base para usuario
app.use("/api/rol", rolrutas); // Ruta base para rol
app.use("/api/usuario_rol", usuario_rol); // Ruta base para usuario_rol
app.use("/api/rutas", rutasru); // Ruta base para rutas
app.use("/api/autobuses", autobusesrutas); // Ruta base para autobuses
app.use("/api/viajes", viajesrutas); // Ruta base para viajes
app.use("/api/boletos", boletorutas); // Ruta base para boletos



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});