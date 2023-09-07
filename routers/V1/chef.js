
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import {chefsCarne} from "../../funciones/chefs.js"
import {chefEliminarCocinaVegetariana} from "../../funciones/chefs.js"

const chef = Router();
chef.get("/chefCarne", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const chefsCarn = await chefsCarne();
      res.send(chefsCarn);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });

  chef.delete("/chefEliminarCocinaVegetariana", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const chefsCarn = await chefEliminarCocinaVegetariana();
      res.send(chefsCarn);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });
  
export default chef;

