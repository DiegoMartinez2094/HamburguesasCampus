import dotenv from "dotenv";
import express from "express";
import versionRoutes from "express-routes-versioning";
import { check } from "express-validator";

import ingredienteStock from "./routers/V1/ingrediente.js";
import  hamburguesaVegetariana  from "./routers/V1/hamburguesa.js";
import  chefsCarne  from "./routers/V1/chef.js";
import  hamburguesaXchefB  from "./routers/V1/hamburguesa.js";
import  hamburguesaPanIntegral  from "./routers/V1/hamburguesa.js";
import  hamburguesaCategoria  from  "./routers/V1/hamburguesa.js";
import  hamburguesaPrecioMayorIgual9  from "./routers/V1/hamburguesa.js";
import  hamburguesa7ingredientes  from "./routers/V1/hamburguesa.js";
import  hamburguesaTomateOLechuga  from "./routers/V1/hamburguesa.js";
import  chefEliminarCocinaVegetariana  from  "./routers/V1/chef.js";

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use("/hamburguesa",
versionRoute({
  "1.0.0": hamburguesaVegetariana,hamburguesaXchefB,hamburguesaPanIntegral,hamburguesaCategoria, hamburguesaPrecioMayorIgual9, hamburguesa7ingredientes,
  hamburguesaTomateOLechuga
}));

app.use("/ingrediente", 
  versionRoute({
    "1.0.0": ingredienteStock,
  })
);


app.use("/chef",
versionRoute({
  "1.0.0": chefsCarne,chefEliminarCocinaVegetariana,
}));


app.listen(config.port, config.hostname, () => {
    console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
  });