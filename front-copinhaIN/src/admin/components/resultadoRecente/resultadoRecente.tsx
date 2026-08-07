import type { ResultadoPartida } from "../../../types/resultadoPartida";
import "./resultadoRecente.css";

interface ResultadoRecenteProps {
  resultado: ResultadoPartida | null;
  carregando: boolean;
  erro: string | null;
}

export default function ResultadoRecente({
  resultado,
  carregando,
  erro,
}: ResultadoRecenteProps) {
  return (
    <section className="resultado-recente-container">
      <h2 className="resultado-recente-titulo">Resultado mais recente</h2>

      {carregando && (
        <p className="resultado-recente-estado">Carregando resultado...</p>
      )}

      {!carregando && erro && (
        <p className="resultado-recente-estado">
          Não foi possível carregar o resultado mais recente.
        </p>
      )}

      {!carregando && !erro && !resultado && (
        <p className="resultado-recente-estado">
          Nenhum resultado disponível ainda.
        </p>
      )}

      {!carregando && !erro && resultado && (
        <div className="resultado-recente-card">
          {resultado.grupo && (
            <p className="resultado-recente-grupo">{resultado.grupo}</p>
          )}
          <div className="resultado-recente-placar">
            <div className="resultado-recente-time">
              <p className="resultado-recente-time-nome">
                {resultado.nomeTimeA}
              </p>
              <p className="resultado-recente-time-placar">
                {resultado.placarTimeA}
              </p>
            </div>

            <p className="resultado-recente-versus">x</p>

            <div className="resultado-recente-time">
              <p className="resultado-recente-time-placar">
                {resultado.placarTimeB}
              </p>
              <p className="resultado-recente-time-nome">
                {resultado.nomeTimeB}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
