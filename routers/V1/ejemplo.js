
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import {obtenerMedicamentosConMenosDe50Unidades} from "../../funciones/obtenermedicamentosmenos50unds.js"


const medicamento = Router();

medicamento.get("/medicamento/50", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    try {
      const medicamentos = await obtenerMedicamentosConMenosDe50Unidades();
      res.send(medicamentos);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  });

  medicamento.post("/medicamento", limitGrt(),  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    try {
        const db = await con();
        const medicamentos = db.collection("medicamento");

        // Aquí debes obtener los datos del nuevo medicamento desde req.body
        const nuevomedicamento = req.body;

        const result = await medicamentos.insertOne(nuevomedicamento);
        res.status(201).send("medicamento creado correctamente");
    } catch (error) {
        console.error("Error al crear el medicamento:", error);
        res.status(500).send("Error interno del servidor");
    }
});

medicamento.put("/usuario/:id", limitGrt(),  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    const usuarioId = req.params.id;
    const datosActualizados = req.body;

    try {
        const db = await con();
        const usuarios = db.collection("usuario");

        // Aquí debes realizar la actualización del usuario con el ID proporcionado
        const result = await usuarios.updateOne({ _id: ObjectId(usuarioId) }, { $set: datosActualizados });

        if (result.modifiedCount === 1) {
            res.send("Usuario actualizado correctamente");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});

medicamento.delete("/usuario/:id", limitGrt(),  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    const usuarioId = req.params.id;

    try {
        const db = await con();
        const usuarios = db.collection("usuario");

        // Aquí debes eliminar el usuario con el ID proporcionado
        const result = await usuarios.deleteOne({ _id: ObjectId(usuarioId) });

        if (result.deletedCount === 1) {
            res.send("Usuario eliminado correctamente");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default medicamento;