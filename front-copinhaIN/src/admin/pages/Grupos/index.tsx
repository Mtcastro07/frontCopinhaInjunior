import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import ResultadoRecente from "../../components/resultadoRecente/resultadoRecente";
import ClassificacaoGrupo from "../../components/classificacaoGrupo/classificacaoGrupo";
import { listarGrupos, listarTimesDoGrupo } from "../../../services/grupoService";
import { buscarResultadoMaisRecente } from "../../../services/resultadoPartidaService";
import type { Grupo } from "../../../types/grupo";
import type { Time } from "../../../types/time";
import type { ResultadoPartida } from "../../../types/resultadoPartida";
import "./Grupos.css";

export default function Grupos() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [timesPorGrupo, setTimesPorGrupo] = useState<Record<string, Time[]>>(
    {}
  );
  const [carregandoGrupos, setCarregandoGrupos] = useState(true);
  const [erroGrupos, setErroGrupos] = useState<string | null>(null);

  const [resultadoRecente, setResultadoRecente] =
    useState<ResultadoPartida | null>(null);
  const [carregandoResultado, setCarregandoResultado] = useState(true);
  const [erroResultado, setErroResultado] = useState<string | null>(null);

  useEffect(() => {
    async function carregarResultadoMaisRecente() {
      try {
        setCarregandoResultado(true);
        const resultado = await buscarResultadoMaisRecente();
        setResultadoRecente(resultado);
        setErroResultado(null);
      } catch (erro) {
        setErroResultado((erro as Error).message);
      } finally {
        setCarregandoResultado(false);
      }
    }

    carregarResultadoMaisRecente();
  }, []);

  useEffect(() => {
    async function carregarGruposEClassificacao() {
      try {
        setCarregandoGrupos(true);
        const listaGrupos = await listarGrupos();
        setGrupos(listaGrupos);

        const timesDeCadaGrupo = await Promise.all(
          listaGrupos.map((grupo) => listarTimesDoGrupo(grupo.id))
        );

        const mapaTimesPorGrupo: Record<string, Time[]> = {};
        listaGrupos.forEach((grupo, indice) => {
          mapaTimesPorGrupo[grupo.id] = timesDeCadaGrupo[indice];
        });

        setTimesPorGrupo(mapaTimesPorGrupo);
        setErroGrupos(null);
      } catch (erro) {
        setErroGrupos((erro as Error).message);
      } finally {
        setCarregandoGrupos(false);
      }
    }

    carregarGruposEClassificacao();
  }, []);

  return (
    <>
      <HeaderAdmin />

      <main className="grupos-container">
        <h1 className="grupos-titulo">Grupos</h1>

        <ResultadoRecente
          resultado={resultadoRecente}
          carregando={carregandoResultado}
          erro={erroResultado}
        />

        <section className="grupos-classificacao-container">
          <h2 className="grupos-classificacao-titulo">Classificação por grupo</h2>

          {erroGrupos && (
            <p className="grupos-estado">
              Não foi possível carregar os grupos.
            </p>
          )}

          {!erroGrupos && !carregandoGrupos && grupos.length === 0 && (
            <p className="grupos-estado">Nenhum grupo cadastrado ainda.</p>
          )}

          <div className="grupos-classificacao-lista">
            {(carregandoGrupos ? [] : grupos).map((grupo) => (
              <ClassificacaoGrupo
                key={grupo.id}
                grupo={grupo}
                times={timesPorGrupo[grupo.id] ?? []}
                carregando={carregandoGrupos}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
