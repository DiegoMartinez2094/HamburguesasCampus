import { con } from '../db/atlas.js';

export async function hamburguesaVegetariana() {
    try {
      const db = await con();
      const ingredients = db.collection("hamburguesa");
      const result = await ingredients.find({ "categoria":{ $eq:"vegetariana"}}).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener las hamburguesa:", error);
      throw error; 
    }
  }

  export async function hamburguesaXchefB() {
    try {
      const db = await con();
      const ingredients = db.collection("hamburguesa");
      const result = await ingredients.find({"preparadaPor":{ $eq: "chefB"} }).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener las hamburguesa:", error);
      throw error; 
    }
  }

  export async function hamburguesaPanIntegral() {
    try {
      const db = await con();
      const ingredients = db.collection("hamburguesa");
      const result = await ingredients.find({ "ingrediente":{ $eq:"pan integral"}}).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener las hamburguesa:", error);
      throw error; 
    }
  }