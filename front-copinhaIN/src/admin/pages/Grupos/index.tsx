import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import ResultadoRecente from "../../components/resultadoRecente/resultadoRecente";
import ClassificacaoGrupo from "../../components/classificacaoGrupo/classificacaoGrupo";
import {
  listarGrupos,
  listarTimesDoGrupo,
} from "../../../services/grupoService";
import { buscarResultadoMaisRecente } from "../../../services/resultadoPartidaService";
import type { Grupo } from "../../../types/grupo";
import type { Time } from "../../../types/time";
import type { ResultadoPartida } from "../../../types/resultadoPartida";
import "./Grupos.css";

export default function Grupos() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [timesPorGrupo, setTimesPorGrupo] = useState<Record<string, Time[]>>(
    {},
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
          listaGrupos.map((grupo) => listarTimesDoGrupo(grupo.id)),
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
    <div className="grupos-page">
      <Navbar />

      <section className="grupos-hero">
        <div className="grupos-hero-container">
          <div className="grupos-hero-texto">
            <p className="grupos-hero-breadcrumb">
              <span className="grupos-hero-breadcrumb-marcador" />
              Copa do Mundo 2026 — Fase de Grupos
            </p>
            <h1 className="grupos-hero-titulo">
              COP<span className="grupos-hero-titulo-highlight">{"{IN}"}</span>
              HA
            </h1>
            <p className="grupos-hero-subtitulo">
              Notícias, placar e tabela da Copa do Mundo em um só lugar
            </p>
          </div>

          <ResultadoRecente
            resultado={resultadoRecente}
            carregando={carregandoResultado}
            erro={erroResultado}
          />
        </div>
      </section>

      <main className="grupos-main">
        <div className="grupos-classificacao-header">
          <h2 className="grupos-classificacao-titulo">
            Classificação dos grupos
          </h2>
          <span className="grupos-classificacao-linha" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3.333 10.667 8 6 12.667"
              stroke="var(--copinha-yellow)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {erroGrupos && (
          <p className="grupos-estado">Não foi possível carregar os grupos.</p>
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
      </main>

      <Footer />
    </div>
  );
}
