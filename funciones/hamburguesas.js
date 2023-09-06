import { con } from '../db/atlas.js';

export async function hamburguesaVegetariana() {
    try {
      const db = await con();
      const ingredients = db.collection("hamburguesa");
      const result = await ingredients.find({ "categoria":{ $eq:"vegetariana"}}).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener los ingrediente:", error);
      throw error; 
    }
  }
