import type { Grupo } from "../../../types/grupo";
import type { Time } from "../../../types/time";
import "./classificacaoGrupo.css";

interface ClassificacaoGrupoProps {
  grupo: Grupo;
  times: Time[];
  carregando: boolean;
}

// Time em posição 1 ou 2 do grupo é considerado classificado, seguindo
// a mesma regra usada pelo StandingService do backend.
const POSICOES_CLASSIFICADAS = 2;

export default function ClassificacaoGrupo({
  grupo,
  times,
  carregando,
}: ClassificacaoGrupoProps) {
  const timesOrdenados = [...times].sort(
    (a, b) => a.posicaoRanking - b.posicaoRanking
  );

  return (
    <section className="classificacao-grupo-container">
      <h3 className="classificacao-grupo-titulo">{grupo.nome}</h3>

      {carregando && (
        <p className="classificacao-grupo-estado">Carregando times...</p>
      )}

      {!carregando && timesOrdenados.length === 0 && (
        <p className="classificacao-grupo-estado">
          Nenhum time cadastrado neste grupo.
        </p>
      )}

      {!carregando && timesOrdenados.length > 0 && (
        <table className="classificacao-grupo-tabela">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Time</th>
              <th>P</th>
              <th>J</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>GP</th>
              <th>GC</th>
              <th>SG</th>
            </tr>
          </thead>
          <tbody>
            {timesOrdenados.map((time) => {
              const jogos = time.vitorias + time.empates + time.derrotas;
              const classificado =
                time.posicaoRanking <= POSICOES_CLASSIFICADAS;

              return (
                <tr
                  key={time.id}
                  className={
                    classificado
                      ? "classificacao-grupo-linha-classificado"
                      : undefined
                  }
                >
                  <td>{time.posicaoRanking}</td>
                  <td className="classificacao-grupo-time">
                    <img
                      className="classificacao-grupo-escudo"
                      src={time.escudoUrl}
                      alt={time.nome}
                    />
                    <span>{time.abreviacao || time.nome}</span>
                  </td>
                  <td>{time.pontos}</td>
                  <td>{jogos}</td>
                  <td>{time.vitorias}</td>
                  <td>{time.empates}</td>
                  <td>{time.derrotas}</td>
                  <td>{time.golsPro}</td>
                  <td>{time.golsContra}</td>
                  <td>{time.saldoGols}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
