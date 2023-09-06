import dotenv from "dotenv";
import express from "express";
import versionRoutes from "express-routes-versioning";
import { check } from "express-validator";
import medicamento from "./routers/V1/ejemplo.js";

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use("/medicamento", [
  check("id_usuario")
    .notEmpty()
    .withMessage("el id_usuario es obligatorio")
    .custom((value) => /^\d+$/.test(value))
    .withMessage("El id_usuario debe ser numérico sin letras")
    .toInt(),

  check("nombre")
    .notEmpty()
    .withMessage("el nombre es obligatorio")
    .isString()
    .withMessage("el nombre debe ser string"),

  check("correo")
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isString()
    .withMessage("El correo debe ser un string")
    .isEmail()
    .withMessage("El correo debe ser una dirección de correo válida"),

  check("contraseña")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .custom((value) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value))
    .withMessage(
      "La contraseña debe contener al menos 8 caracteres, incluyendo números y letras"
    ),

  check("rol")
    .notEmpty()
    .withMessage("el rol es obligatorio")
    .custom((value) =>
      ["cliente", "repartidor"].includes(value.toLowerCase())
    )
    .withMessage(
      "rol no válido debee ser alguno de estos: repartidor o cliente"
    ),

  check("telefono")
    .notEmpty()
    .withMessage("el telefono es obligatorio")
    .isString()
    .withMessage("el telefono debe ser string"),

  check("direccion")
    .notEmpty()
    .withMessage("la direccion es obligatorio")
    .isString()
    .withMessage("la direccion debe ser string"),
],
  versionRoute({
    "1.0.0": medicamento,
  })
);


app.listen(config.port, config.hostname, () => {
    console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
  });