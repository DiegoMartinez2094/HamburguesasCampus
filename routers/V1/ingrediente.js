
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import {ingredientesStock} from "../../funciones/ingredientes.js"
import {ingredientesEliminaStock0} from "../../funciones/ingredientes.js"

const ingrediente = Router();

ingrediente.get("/ingredienteStock400", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const ingredientes = await ingredientesStock();
      res.send(ingredientes);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });


ingrediente.delete("/ingredientesEliminaStock0", limitGrt(), async (req, res) => {
  if (!req.rateLimit) return;
  console.log(req.rateLimit);
  try {
    const ingredientes = await ingredientesEliminaStock0();
    res.send(ingredientes);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});
  
export default ingrediente;

