// Espelha o DTO retornado pelo TeamPresenter (backend)
export interface Time {
  id: string;
  nome: string;
  abreviacao: string;
  escudoUrl: string;
  posicaoRanking: number;
  vitorias: number;
  derrotas: number;
  empates: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
  pontos: number;
  criadoEm: string;
  atualizadoEm: string;
}

// Um time já vinculado ao grupo a que pertence, usado para montar a
// classificação por grupo dentro da tela de Grupos.
export interface TimeDoGrupo extends Time {
  grupoId: string;
}
