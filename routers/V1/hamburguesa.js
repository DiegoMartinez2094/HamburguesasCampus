
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import {hamburguesaVegetariana} from "../../funciones/hamburguesas.js"
import { hamburguesaXchefB } from "../../funciones/hamburguesas.js";
import { hamburguesaPanIntegral } from "../../funciones/hamburguesas.js";

const hamburguesa = Router();

hamburguesa.get("/hamburguesaVegetariana", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const hambur = await hamburguesaVegetariana();
      res.send(hambur);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });

  hamburguesa.get("/hamburguesaXchefB", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const hambur = await hamburguesaXchefB();
      res.send(hambur);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });

  hamburguesa.get("/hamburguesaPanIntegral", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const hambur = await hamburguesaPanIntegral();
      res.send(hambur);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });

export default hamburguesa;

