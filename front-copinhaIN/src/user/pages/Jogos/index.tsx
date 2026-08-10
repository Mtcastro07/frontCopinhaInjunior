import { useState, useEffect } from "react";
import "./jogos.css";
import type { ResultadoPartida } from "../../../types/resultadoPartida";
import { buscarResultadoMaisRecente } from "../../../services/resultadoPartidaService";
import ResultadoRecente from "../../../admin/components/resultadoRecente/resultadoRecente";
import Header from "../../components/Header";
import Footer from "../../../components/footer/footer";
import { IconeLocal } from "./icones";
import type { resultadoPartida } from "../../../admin/pages/Dashboard";
import { api } from "../../../api";
import type { Jogo } from "../../../admin/pages/Dashboard";
import type { Time } from "../../../types/time";

export default function Jogos() {
  const [aberto, setAberto] = useState<string>("Todos");
  const [resultadoRecente, setResultadoRecente] =
    useState<ResultadoPartida | null>(null);
  const [carregandoResultado, setCarregandoResultado] = useState(true);
  const [erroResultado, setErroResultado] = useState<string | null>(null);
  const [encerradosPartidas, setEncerradosPartidas] = useState<
    resultadoPartida[]
  >([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [aguardandoPartidas, setAguardandoPartidas] = useState<Jogo[]>([]);
  const [carregandoPartidas, setCarregandoPartidas] = useState(false);
  const [errorPartidas, setErrorPartidas] = useState(false);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [mostrarPartidas, setMostrarPartidas] = useState<any[]>([]);

  useEffect(() => {
    async function carregarTimes() {
      const response = await api.get("urlTimes");
      setTimes(response.data);
    }
    carregarTimes();
  }, [mostrarPartidas]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        setCarregandoPartidas(true);
        setErrorPartidas(false);

        const response = await api.get("urlJogos");
        setJogos(response.data);
      } catch (error) {
        console.error("Error em carregar as partidas" + error);
        setErrorPartidas(true);
      } finally {
        setCarregandoPartidas(false);
      }
    }
    carregarJogos();
  }, [mostrarPartidas]);

  useEffect(() => {
    async function carregarResultadosRecentes() {
      try {
        setCarregandoPartidas(true);
        setErrorPartidas(false);

        const response = await api.get("urlResultados");
        setEncerradosPartidas(response.data);
      } catch (error) {
        console.error("erro em carregar as partidas recentes");
        setErrorPartidas(true);
      } finally {
        setCarregandoPartidas(false);
      }
    }
    carregarResultadosRecentes();
  }, [mostrarPartidas]);

  useEffect(() => {
    async function carregarProximasPartidas() {
      try {
        setCarregandoPartidas(true);
        setErrorPartidas(false);

        const response = await api.get("urlJogos");
        let todasPartidas = response.data;
        let proximasPartidas = todasPartidas.filter(
          (partida: Jogo) =>
            new Date(partida.data).getTime() > new Date().getTime(),
        );
        setAguardandoPartidas(proximasPartidas);
      } catch (error) {
        console.error("Erro no carregamento das partidas agendadas");
        setErrorPartidas(true);
      } finally {
        setCarregandoPartidas(false);
      }
    }
    carregarProximasPartidas();
  }, [mostrarPartidas]);

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

  let todasPartidas = [...encerradosPartidas, ...aguardandoPartidas];

  return (
    <>
      <Header />
      <main className="main-jogos-user-page">
        <div className="grupos-hero-container-jogos">
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
        <div className="titulo-line-icon-jogos">
          <h2 className="grupos-classificacao-titulo">
            CLASSIFICAÇÃO DOS GRUPOS
          </h2>
          <span className="grupos-classificacao-linha"></span>
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
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div className="buttons-jogos-user-page">
          <button
            className={
              aberto == "Todos"
                ? "button-jogos-user-page-aberto"
                : "button-jogos-user-page-fechado"
            }
            onClick={() => {
              setAberto("Todos");
              setMostrarPartidas(todasPartidas);
            }}
          >
            Todos
          </button>
          <button
            className={
              aberto == "Encerrados"
                ? "button-jogos-user-page-aberto"
                : "button-jogos-user-page-fechado"
            }
            onClick={() => {
              setAberto("Encerrados");
              setMostrarPartidas(encerradosPartidas);
            }}
          >
            Encerrados
          </button>
          <button
            className={
              aberto == "Proximos"
                ? "button-jogos-user-page-aberto"
                : "button-jogos-user-page-fechado"
            }
            onClick={() => {
              setAberto("Proximos");
              setMostrarPartidas(aguardandoPartidas);
            }}
          >
            Proximos
          </button>
        </div>
        <div className="jogos-user-page">
          {mostrarPartidas.map((partida) => {
            let resultadoPartida = jogos.find(
              (jogo) => jogo.id == partida.idPartida,
            );
            let time1 = times.find((time) => time.nome == partida.nomeTimeA);
            let time2 = times.find((time) => time.nome == partida.nomeTimeB);

            if (new Date(partida.criadoEm).getTime() < new Date().getTime()) {
              return (
                <>
                  {" "}
                  <div className="jogo-user-page">
                    <div className="grupo-local-jogos-user-page">
                      <p className="grupo-jogos-user-page">
                        GRUPO {resultadoPartida?.grupo}
                      </p>
                      <div className="local-icone-jogos-user-page">
                        <IconeLocal />
                        <p className="nome-local-jogos-user-page">
                          {resultadoPartida?.estadio}
                        </p>
                      </div>
                    </div>
                    <div className="times-jogos-user-page">
                      <div className="time-jogos-user-page">
                        <img
                          src={time1?.escudoUrl}
                          className="escudo-time-jogos-user-page"
                          alt="img-escudo"
                        ></img>
                        <div className="nome-apelido-user-page">
                          <p className="nome-user-page">{time1?.nome}</p>
                          <p className="apelido-user-page">
                            {time1?.abreviacao}
                          </p>
                        </div>
                      </div>
                      <div className="placar-user-page">
                        <p>
                          {partida.placarTimeA}
                          <span>-</span>
                          {partida.placarTimeB}
                        </p>
                      </div>
                      <div className="time-jogos-user-page">
                        <div className="nome-apelido-user-page">
                          <p className="nome-user-page">{time2?.nome}</p>
                          <p className="apelido-user-page">
                            {time2?.abreviacao}
                          </p>
                        </div>
                        <img
                          className="escudo-time-jogos-user-page"
                          src={time2?.escudoUrl}
                          alt="img-time"
                        ></img>
                      </div>
                    </div>
                    <p className="line-jogos-user-page">a</p>
                    <div className="local-jogos-user-page">
                      <IconeLocal />
                      <p className="nome-local-jogos-user-page">
                        {resultadoPartida?.estadio}
                      </p>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  {" "}
                  <div className="jogo-user-page">
                    <div className="grupo-local-jogos-user-page">
                      <p className="grupo-jogos-user-page">
                        GRUPO {partida.grupo}
                      </p>
                      <div className="local-icone-jogos-user-page">
                        <IconeLocal />
                        <p className="nome-local-jogos-user-page">
                          {resultadoPartida?.estadio}
                        </p>
                      </div>
                    </div>
                    <div className="times-jogos-user-page">
                      <div className="time-jogos-user-page">
                        <img
                          src={time1?.escudoUrl}
                          className="escudo-time-jogos-user-page"
                          alt="img-escudo"
                        />
                        <div className="nome-apelido-user-page">
                          <p className="nome-user-page">{time1?.nome}</p>
                          <p className="apelido-user-page">
                            {time1?.abreviacao}
                          </p>
                        </div>
                      </div>
                      <div className="placar-user-page">
                        <p>
                          0<span>-</span>0
                        </p>
                      </div>
                      <div className="time-jogos-user-page">
                        <div className="nome-apelido-user-page">
                          <p className="nome-user-page">{time2?.nome}</p>
                          <p className="apelido-user-page">
                            {time2?.abreviacao}
                          </p>
                        </div>
                        <img
                          src={time2?.escudoUrl}
                          className="escudo-time-jogos-user-page"
                          alt="img-escudo"
                        />
                      </div>
                    </div>
                    <p className="line-jogos-user-page">a</p>
                    <div className="local-jogos-user-page">
                      <IconeLocal />
                      <p className="nome-local-jogos-user-page">
                        {resultadoPartida?.estadio}
                      </p>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>

        {carregandoPartidas && (
          <p className="loading-jogos-user-page">Carregando partidas...</p>
        )}
        {errorPartidas && (
          <p className="error-jogos-user-page">Erro ao carregas as partidas</p>
        )}
      </main>
      <Footer />
    </>
  );
}
