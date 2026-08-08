import type { Grupo } from "../../../types/grupo";
import type { Time } from "../../../types/time";
import "./classificacaoGrupo.css";

interface ClassificacaoGrupoProps {
  grupo: Grupo;
  times: Time[];
  carregando: boolean;
}

// Times na posição 1 ou 2 do grupo avançam de fase, seguindo a mesma
// regra usada pelo StandingService do backend.
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
    <article className="classificacao-grupo-card">
      <header className="classificacao-grupo-header">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.333 2.667 3.5v3.833c0 3.412 2.28 6.436 5.333 7.334 3.053-.898 5.333-3.922 5.333-7.334V3.5L8 1.333Z"
            stroke="var(--copinha-yellow)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="classificacao-grupo-titulo">
          {grupo.nome.toUpperCase()}
        </h3>
      </header>

      {carregando && (
        <p className="classificacao-grupo-estado">Carregando times...</p>
      )}

      {!carregando && timesOrdenados.length === 0 && (
        <p className="classificacao-grupo-estado">
          Nenhum time cadastrado neste grupo.
        </p>
      )}

      {!carregando && timesOrdenados.length > 0 && (
        <>
          <table className="classificacao-grupo-tabela">
            <thead>
              <tr>
                <th className="coluna-posicao">#</th>
                <th className="coluna-selecao">Seleção</th>
                <th>J</th>
                <th>V</th>
                <th>E</th>
                <th>D</th>
                <th>GP</th>
                <th>GC</th>
                <th>SG</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {timesOrdenados.map((time) => {
                const jogos = time.vitorias + time.empates + time.derrotas;
                const classificado =
                  time.posicaoRanking <= POSICOES_CLASSIFICADAS;
                const saldoPositivo = time.saldoGols > 0;
                const saldoNegativo = time.saldoGols < 0;

                return (
                  <tr
                    key={time.id}
                    className={
                      classificado ? "linha-classificada" : undefined
                    }
                  >
                    <td className="coluna-posicao">{time.posicaoRanking}</td>
                    <td className="coluna-selecao">
                      <div className="classificacao-grupo-time">
                        <img
                          className="classificacao-grupo-escudo"
                          src={time.escudoUrl}
                          alt={time.nome}
                        />
                        <div className="classificacao-grupo-nomes">
                          <span className="classificacao-grupo-nome">
                            {time.nome}
                          </span>
                          <span className="classificacao-grupo-abreviacao">
                            {time.abreviacao}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{jogos}</td>
                    <td>{time.vitorias}</td>
                    <td>{time.empates}</td>
                    <td>{time.derrotas}</td>
                    <td>{time.golsPro}</td>
                    <td>{time.golsContra}</td>
                    <td
                      className={
                        saldoPositivo
                          ? "saldo-positivo"
                          : saldoNegativo
                          ? "saldo-negativo"
                          : undefined
                      }
                    >
                      {time.saldoGols > 0 ? "+" : ""}
                      {time.saldoGols}
                    </td>
                    <td className="coluna-pontos">{time.pontos}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="classificacao-grupo-legenda">
            <span className="classificacao-grupo-legenda-marcador" />
            Classificados para a próxima fase
          </p>
        </>
      )}
    </article>
  );
}
