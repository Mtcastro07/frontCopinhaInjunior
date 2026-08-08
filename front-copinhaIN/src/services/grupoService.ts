import { httpClient } from "./httpClient";
import type { Grupo } from "../types/grupo";
import type { Time } from "../types/time";

// GET /groups
// Lista todos os grupos cadastrados no banco de dados.
export function listarGrupos(): Promise<Grupo[]> {
  return httpClient.get<Grupo[]>("/groups");
}

// GET /groups/:groupPublicId/teams
// Lista os times pertencentes a um grupo específico, já ordenados
// pelo backend por posição na classificação (posicaoRanking).
export function listarTimesDoGrupo(grupoId: string): Promise<Time[]> {
  return httpClient.get<Time[]>(`/groups/${grupoId}/teams`);
}
