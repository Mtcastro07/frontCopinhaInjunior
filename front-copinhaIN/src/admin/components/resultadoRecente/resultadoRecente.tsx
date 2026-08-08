import type { ResultadoPartida } from "../../../types/resultadoPartida";
import "./resultadoRecente.css";

interface ResultadoRecenteProps {
  resultado: ResultadoPartida | null;
  carregando: boolean;
  erro: string | null;
}

// A API de resultado de partida ainda não retorna bandeira/escudo do time,
// então usamos as iniciais do nome como identificação visual provisória.
function iniciais(nomeTime: string): string {
  return nomeTime.slice(0, 3).toUpperCase();
}

export default function ResultadoRecente({
  resultado,
  carregando,
  erro,
}: ResultadoRecenteProps) {
  return (
    <div className="resultado-recente-card">
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
        <>
          <p className="resultado-recente-label">
            Último resultado{resultado.grupo ? ` — ${resultado.grupo}` : ""}
          </p>

          <div className="resultado-recente-placar">
            <div className="resultado-recente-time">
              <span className="resultado-recente-escudo">
                {iniciais(resultado.nomeTimeA)}
              </span>
              <span className="resultado-recente-sigla">
                {iniciais(resultado.nomeTimeA)}
              </span>
            </div>

            <p className="resultado-recente-placar-numeros">
              {resultado.placarTimeA} x {resultado.placarTimeB}
            </p>

            <div className="resultado-recente-time">
              <span className="resultado-recente-escudo">
                {iniciais(resultado.nomeTimeB)}
              </span>
              <span className="resultado-recente-sigla">
                {iniciais(resultado.nomeTimeB)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
