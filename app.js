import dotenv from "dotenv";
import express from "express";
import versionRoutes from "express-routes-versioning";
import { check } from "express-validator";
import ingredienteStock from "./routers/V1/ingrediente.js";
import  hamburguesaVegetariana  from "./routers/V1/hamburguesa.js";
import  chefsCarne  from "./routers/V1/chef.js";
import  hamburguesaXchefB  from "./routers/V1/hamburguesa.js";
import  hamburguesaPanIntegral  from "./routers/V1/hamburguesa.js";

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use("/hamburguesa",
versionRoute({
  "1.0.0": hamburguesaVegetariana,
}));

app.use("/ingrediente", 
  versionRoute({
    "1.0.0": ingredienteStock,
  })
);


app.use("/chef",
versionRoute({
  "1.0.0": chefsCarne,hamburguesaXchefB,hamburguesaPanIntegral,
}));


app.listen(config.port, config.hostname, () => {
    console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
  });