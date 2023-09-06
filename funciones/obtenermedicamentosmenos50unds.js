import { con } from '../db/atlas.js';

export async function obtenerMedicamentosConMenosDe50Unidades() {
    try {
      const db = await con();
      const medicamentos = db.collection("medicamento");
      const result = await medicamentos.find({ "und_medicamento_por_vender": { $lt: 50 } }).toArray();
      return result;
    } catch (error) {
      console.error("Error al obtener los medicamentos:", error);
      throw error; 
    }
  }