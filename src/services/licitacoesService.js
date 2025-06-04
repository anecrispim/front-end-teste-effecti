import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export async function buscarLicitacoes(filtros = {}) {
  try {
    const response = await axios.get(`${API_BASE_URL}/licitacoes/listar`, {
      params: filtros,
    });
    return response.data.dados;
    
  } catch (error) {
    console.error("Erro ao buscar licitações:", error);
    throw error;
  }
}
