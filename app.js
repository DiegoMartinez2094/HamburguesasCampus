import dotenv from "dotenv";
import express from "express";
import versionRoutes from "express-routes-versioning";
import { check } from "express-validator";
import { limitGrt } from "./limit/config.js";

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);


app.listen(config.port, config.hostname, () => {
    console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
  });