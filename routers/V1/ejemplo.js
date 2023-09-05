
import { con } from "../../db/atlas";
import { Router } from "express";
import { limitGrt } from "../../limit/config";
import { validarToken } from '../../middlewares/JWT';


const usuario = Router();

usuario.get("/usuario",limitGrt(),validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con();
        const usuarios = db.collection("usuario");
        const result = await usuarios.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
});

usuario2.get("/usuario/rol/:rol", limitGrt(), validarToken,
    async (req, res) => {
      if (!req.rateLimit) return;
      console.log(req.rateLimit);
      const rol = req.params.rol;
      try {
        const db = await con();
        const usuarios = db.collection("usuario");
        const matchingusuarios = await usuarios.find({ rol }).toArray();
        if (matchingusuarios.length > 0) {
          res.send(matchingusuarios);
        } else {
          res.status(404).send("usuarios no encontrados con el rol especificado");
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
      }
    }
  );

usuario.post("/usuario", limitGrt(), validarToken, async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    try {
        const db = await con();
        const usuarios = db.collection("usuario");

        // Aquí debes obtener los datos del nuevo usuario desde req.body
        const nuevoUsuario = req.body;

        const result = await usuarios.insertOne(nuevoUsuario);
        res.status(201).send("Usuario creado correctamente");
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});

usuario.put("/usuario/:id", limitGrt(), validarToken, async (req, res) => {
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

usuario.delete("/usuario/:id", limitGrt(), validarToken, async (req, res) => {
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

export default usuario;