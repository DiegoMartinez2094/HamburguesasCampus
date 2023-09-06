
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import {chefsCarne} from "../../funciones/chefs.js"

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
export default chef;

