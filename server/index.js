// importar express
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const configs = require("./config");
const db = require("./config/database");

require("dotenv").config({ path: "variables.env" });

// probando la conexion a la db
db.authenticate()
  .then(() => console.log("DB Conectada"))
  .catch((error) => console.log(error));

// configurar express
const app = express();

// habilitar pug
app.set("view engine", "pug");

// Agregar las vistas
app.set("views", path.join(__dirname, "./views"));

// cargar una carpeta estatica llamada public
app.use(express.static("public"));

// validar si estamos en desarrollo o en produccion
const config = configs[app.get("env")];

// creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// muestra el año actual y genera la ruta
app.use((req, res, next) => {
  // crear una nueva fecha
  const fecha = new Date();
  // variables internas de node para crear objetos
  res.locals.fechaActual = fecha.getFullYear();
  res.locals.ruta = req.path;
  return next();
});

// ejecutamos el body parser
app.use(bodyParser.urlencoded({ extended: true }));

// cargar las rutas
app.use("/", routes());

// Puerto y host para la app
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log("Servidor funcionando");
});
