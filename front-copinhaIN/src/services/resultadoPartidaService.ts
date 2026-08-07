import { httpClient } from "./httpClient";
import type { ResultadoPartida } from "../types/resultadoPartida";

// GET /matches-results/latest
// Busca o resultado de partida mais recente disponível, usado tanto
// na Home quanto na tela de Grupos.
export function buscarResultadoMaisRecente(): Promise<ResultadoPartida> {
  return httpClient.get<ResultadoPartida>("/matches-results/latest");
}
