// Espelha o DTO retornado pelo MatchResultPresenter (backend)
export interface ResultadoPartida {
  id: string;
  nomeTimeA: string;
  placarTimeA: number;
  nomeTimeB: string;
  placarTimeB: number;
  idPartida: string;
  criadoEm: string;
  // Campos opcionais úteis para exibição, caso a API venha a retorná-los
  // junto do resultado (grupo/estádio da partida, por exemplo).
  grupo?: string;
}
