import HeaderAdmin from "../../components/header/header";
import "./dashboard.css";
import NoticiaIcon from "./icons/noticiaIcon";
import useContagem from "../../hooks/useContagem";
import { useEffect, useState } from "react";
import CheckIcon from "./icons/checkIcon";
import Escudo from "./icons/escudoIcon";
import EstadioIcon from "./icons/estadioIcon";
import axios from "axios";
import TrofeuIcon from "./icons/trofeuIcon";
import type { Time } from "../Times";
import { api } from "../../../services/api";

export interface Noticia {
  id: string;
  titulo: string;
  textoAbertura: string;
  textoCorpo: string;
  urlImagemCapa: string;
  tempoLeitura: number;
  autor: string;
  grupo: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Jogo {
  id: string;
  data: string;
  status: string;
  grupo: string;
  timeA: string;
  timeB: string;
  estadio: string;
  criadoEm: Date;
  atualizadoEm: string;
}

export interface resultadoTime {
  id: string;
  publicId: string;
  gols: number;
  dataCriacao: string;
}

export interface resultadoPartida {
  id: string;
  nomeTimeA: string;
  placarTimeA: number;
  nomeTimeB: string;
  placarTimeB: number;
  idPartida: string;
  criadoEm: Date;
}

export default function Dashboard() {
  const [qntdNoticias, setQntdNoticas] = useState<number>(0);
  const [qntdTimes, setQntdTimes] = useState<number>(0);
  const [qntdEstadios, setQntdEstadios] = useState<number>(0);
  const [qntdGrupos, setQntdGrupos] = useState<number>(0);
  const [qntdJogos, setQntdJogos] = useState<number>(0);
  const [qntdJogosAgendados, setQntdJogosAgendados] = useState<number>(0);
  const [noticia, setNoticia] = useState<Noticia[]>();
  const [resultados, setResultados] = useState<resultadoPartida[]>([]);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [times, setTimes] = useState<Time[]>([]);

  useContagem(setQntdNoticas, "urlNoticias");
  useContagem(setQntdTimes, "urlTimes");
  useContagem(setQntdJogos, "urlJogos");
  useContagem(setQntdEstadios, "urlEstadios");
  useContagem(setQntdGrupos, "urlGrupos");

  useEffect(() => {
    async function carregarResultados() {
      const response = await api.get("urlResultados");
      let resultados = response.data;
      let latestResultado = resultados.slice(0, 5);
      latestResultado = resultados.sort(
        (a: resultadoPartida, b: resultadoPartida) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
      );
      setResultados(latestResultado);
    }
    carregarResultados();
  }, []);

  useEffect(() => {
    async function carregarJogos() {
      const response = await api.get("urlJogos");
      return setJogos(response.data);
    }
    carregarJogos();
  }, []);

  useEffect(() => {
    async function carregarTimes() {
      const response = await api.get("urlTimes");
      return setTimes(response.data);
    }
    carregarTimes();
  }, []);

  useEffect(() => {
    async function filtrarJogosAgendados() {
      const response = await api.get("urlJogos");
      return response.data;
    }

    async function carregarJogosAgendados() {
      const totalJogos = await filtrarJogosAgendados();
      const jogosAgendados = totalJogos.filter(
        (jogo: any) => jogo.situacao === "agendado",
      );
      setQntdJogosAgendados(jogosAgendados.length);
    }

    carregarJogosAgendados();
  }, []);

  useEffect(() => {
    async function carregarNoticias() {
      const response = await api.get("urlNoticias");
      let noticias = response.data;
      let cincoNoticias = [...noticias].sort(
        (a: Noticia, b: Noticia) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
      );
      cincoNoticias = cincoNoticias.slice(0, 5);
      return setNoticia(cincoNoticias);
    }
    carregarNoticias();
  }, []);

  const imagem = "imagem";

  return (
    <>
      <div className="division-header-page">
        <HeaderAdmin />
        <main>
          <div className="dashboard-header">
            <h4 className="title-dashboard">Dashboard</h4>
          </div>
          <div className="dashboard-main-page">
            <div className="cards-dashboard">
              <div className="card-dashboard">
                <NoticiaIcon />
                <p className="card-number-dashboard">{qntdNoticias}</p>
                <p className="card-title-dashboard">Notícias</p>
                <p className="card-subtitle-dashboard">
                  {qntdNoticias} com conteúdo
                </p>
              </div>
              <div className="card-dashboard">
                <Escudo />
                <p className="card-number-dashboard">{qntdTimes}</p>
                <p className="card-title-dashboard">Times</p>
                <p className="card-subtitle-dashboard">{qntdGrupos} grupos</p>
              </div>
              <div className="card-dashboard">
                <CheckIcon />
                <p className="card-number-dashboard">{qntdJogos}</p>
                <p className="card-title-dashboard">Jogos realizados</p>
                <p className="card-subtitle-dashboard">
                  {qntdJogosAgendados} agendados
                </p>
              </div>
              <div className="card-dashboard">
                <EstadioIcon />
                <p className="card-number-dashboard">{qntdEstadios}</p>
                <p className="card-title-dashboard">Estadios</p>
                <p className="card-subtitle-dashboard">
                  {qntdJogos} em estádios
                </p>
              </div>
            </div>

            <div className="latestNews-section">
              <div className="latestNews-card">
                <img
                  className="latestNews-authorImage"
                  src={noticia?.[0].urlImagemCapa}
                  alt="imagem"
                ></img>
                <div className="latestNews-textcontent">
                  <h5 className="title-latestNew">{noticia?.[0].titulo}</h5>
                  <div className="subtitle-latestNews">
                    <p className="author-latestNews">{noticia?.[0].autor}</p>{" "}
                    <p className="span-latestNews">
                      · {noticia?.[0].tempoLeitura} min de leitura
                    </p>
                  </div>
                </div>
              </div>
              <div className="latestNews-card">
                <img
                  className="latestNews-authorImage"
                  src={imagem}
                  alt="imagem"
                ></img>
                <div className="latestNews-textcontent">
                  <h5 className="title-latestNew">{noticia?.[1].titulo}</h5>
                  <div className="subtitle-latestNews">
                    <p className="author-latestNews">{noticia?.[1].autor}</p>{" "}
                    <p className="span-latestNews">
                      · {noticia?.[1].tempoLeitura} min de leitura
                    </p>
                  </div>
                </div>
              </div>
              <div className="latestNews-card">
                <img
                  className="latestNews-authorImage"
                  src={imagem}
                  alt="imagem"
                ></img>
                <div className="latestNews-textcontent">
                  <h5 className="title-latestNew">{noticia?.[2].titulo}</h5>
                  <div className="subtitle-latestNews">
                    <p className="author-latestNews">{noticia?.[2].autor}</p>{" "}
                    <p className="span-latestNews">
                      · {noticia?.[2].tempoLeitura} min de leitura
                    </p>
                  </div>
                </div>
              </div>
              <div className="latestNews-card">
                <img
                  className="latestNews-authorImage"
                  src={imagem}
                  alt="imagem"
                ></img>
                <div className="latestNews-textcontent">
                  <h5 className="title-latestNew">{noticia?.[3].titulo}</h5>
                  <div className="subtitle-latestNews">
                    <p className="author-latestNews">{noticia?.[3].autor}</p>{" "}
                    <p className="span-latestNews">
                      · {noticia?.[3].tempoLeitura} min de leitura
                    </p>
                  </div>
                </div>
              </div>
              <div className="latestNews-card">
                <img
                  className="latestNews-authorImage"
                  src={imagem}
                  alt="imagem"
                ></img>
                <div className="latestNews-textcontent">
                  <h5 className="title-latestNew">{noticia?.[4].titulo}</h5>
                  <div className="subtitle-latestNews">
                    <p className="author-latestNews">{noticia?.[4].autor}</p>{" "}
                    <p className="span-latestNews">
                      · {noticia?.[4].tempoLeitura} min de leitura
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="latestJogos-dashboard">
              <div className="latestJogos-header">
                <TrofeuIcon />
                <p className="latestJogos-titulo-header">RESULTADOS RECENTES</p>
              </div>
              <div className="latestJogos-list">
                {resultados.map((resultado) => {
                  const jogosFiltrados = jogos.find(
                    (jogo) => jogo.id == resultado.idPartida,
                  );
                  const time1 = times.find(
                    (time) => time.id == jogosFiltrados?.timeA,
                  );
                  const time2 = times.find(
                    (time) => time.id == jogosFiltrados?.timeB,
                  );

                  return (
                    <div key={resultado.id} className="latestJogo">
                      <div className="time1-latestJogo">
                        <p>{time1?.escudoUrl}</p>
                        <p className="name-latestJogo">{time1?.abreviacao}</p>
                      </div>
                      <div className="resultado-latestJogo">
                        <p className="resultado-jogoLatest">
                          {resultado.placarTimeA}
                        </p>
                        <p className="resultado-jogoLatest">-</p>
                        <p className="resultado-jogoLatest">
                          {resultado.placarTimeB}
                        </p>
                      </div>
                      <div className="time1-latestJogo">
                        <p>{time2?.escudoUrl}</p>
                        <p className="name-latestJogo">{time2?.abreviacao}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
