import { con } from '../db/atlas.js';

export async function ingredientesStock() {
    try {
      const db = await con();
      const ingredients = db.collection("ingrediente");
      const result = await ingredients.find({ "stock_ingrediente":{ $lt: 400 } }).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener los ingrediente:", error);
      throw error; 
    }
  }

  