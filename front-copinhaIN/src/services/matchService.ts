import { api } from "../api";
import { mockUltimoResultado } from "../mocks/mockData";
 
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
 

 
export interface Jogo {
  id: string;
  grupo: string;
  timeMandante: string;
  timeVisitante: string;
  placarMandante: number | null;
  placarVisitante: number | null;
  data: string;
  finalizado: boolean;
}

export type SimulationResults = "mandante" | "empate" | "visitante";
 

export async function getJogos(): Promise<Jogo[]> {
  const { data } = await api.get<Jogo[]>("/jogos");
  return data;
}
 

export async function getJogosPerGroup(grupo: string): Promise<Jogo[]> {
  const { data } = await api.get<Jogo[]>(`/jogos/grupo/${grupo}`);
  return data;
}
 

export async function getUltimoResultado(): Promise<Jogo> {
  if (USE_MOCK) return mockUltimoResultado;
  const { data } = await api.get<Jogo>("/jogos/ultimo-resultado");
  return data;
}
 

export async function sendSimulation(
  jogoId: string,
  resultado: SimulationResults
): Promise<Jogo> {
  const { data } = await api.post<Jogo>(`/jogos/${jogoId}/simulacao`, { resultado });
  return data;
}
 

export async function deleteJogo(jogoId: string): Promise<void> {
  await api.delete(`/jogos/${jogoId}`);
}
