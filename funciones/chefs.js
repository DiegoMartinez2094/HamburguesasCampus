import { con } from '../db/atlas.js';

export async function chefsCarne() {
    try {
      const db = await con();
      const ches = db.collection("chef");
      const result = await ches.find({"especialidad_chef":{ $eq:"carnes"}}).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener los chefs:", error);
      throw error; 
    }
  }

  export async function chefEliminarCocinaVegetariana() {
    try {
      const db = await con();
      const ches = db.collection("chef");
      const result = await ches.deleteOne( { "especialidad" :"Cocina Vegetariana" } )
      return result;
    } catch (error) {
      console.error("Error al eliminar los chefs:", error);
      throw error; 
    }
  }