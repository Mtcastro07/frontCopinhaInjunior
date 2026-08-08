import { use, useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import "./jogos.css";
import type { Jogo } from "../Dashboard";
import type { Time } from "../Times";
import type { resultadoPartida } from "../Dashboard";
import { ApagarIcone, EditarIcone } from "../Noticias/icones";
import axios from "axios";
import { api } from "../../../services/api";
import FecharModalIcone from "./icones";
import type { Grupo } from "../GruposAdmin/index";
import type { Estadio } from "../Estadios";

export interface dadosFormJogo {
  TimeNome1: string;
  TimeNome2: string;
  grupo: string;
  golsTime1: number;
  golsTime2: number;
  estadio: string;
  data: string;
}

export function JogosAdmin() {
  const [criarJogo, setCriarJogo] = useState<boolean>(false);
  const [editarJogo, setEditarJogo] = useState<boolean>(false);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [estadios, setEstadios] = useState<Estadio[]>([]);
  const [resultado, setResultado] = useState<resultadoPartida[]>([]);
  const [jogoEditando, setJogoEditando] = useState<Jogo | null>(null);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [dadosFormEditar, setDadosFormEditar] = useState<dadosFormJogo>({
    TimeNome1: "",
    TimeNome2: "",
    grupo: "",
    golsTime1: 0,
    golsTime2: 0,
    estadio: "",
    data: "",
  });
  const [dadosFormCriar, setDadosFormCriar] = useState<dadosFormJogo>({
    TimeNome1: "",
    TimeNome2: "",
    grupo: "",
    golsTime1: 0,
    golsTime2: 0,
    estadio: "",
    data: "",
  });

  useEffect(() => {
    async function carregarGrupos() {
      const response = await api.get("urlGrupos");
      return setGrupos(response.data);
    }
    carregarGrupos();
  }, []);

  useEffect(() => {
    if (jogoEditando) {
      const timeCasa = times.find((time) => time.id === jogoEditando.timeA);
      const timeVisitante = times.find(
        (time) => time.id === jogoEditando.timeB,
      );

      setDadosFormEditar({
        TimeNome1: timeCasa?.nome ?? "",
        TimeNome2: timeVisitante?.nome ?? "",
        grupo: jogoEditando.grupo,
        golsTime1: 0,
        golsTime2: 0,
        estadio: "",
        data: jogoEditando.data,
      });
    }
  }, [jogoEditando, times]);

  useEffect(() => {
    async function carregarEstadios() {
      const response = await api.get("urlEstadios");
      return setEstadios(response.data);
    }
    carregarEstadios();
  }, []);

  useEffect(() => {
    async function carregarResultado() {
      const response = await api.get("urlResultado");
      return setResultado(response.data);
    }
    carregarResultado();
  }, []);

  useEffect(() => {
    async function carregarTimes() {
      const response = await api.get("urlTimes");
      return setTimes(response.data);
    }
    carregarTimes();
  }, []);

  useEffect(() => {
    async function carregarJogos() {
      const response = await api.get("urlJogos");
      return setJogos(response.data);
    }
    carregarJogos();
  }, []);

  async function deletarJogo(id: string) {
    await api.delete(`/admin/matches-results/${id}`);
    setJogos((prevJogos) => prevJogos.filter((jogo) => jogo.id !== id));
  }
  async function salvarJogoEditar() {
    const response = await api.get("urlJogos");
    setJogos(response.data);
    setEditarJogo(false);
    setJogoEditando(null);
  }

  async function salvarJogoCriar() {
    const response = await api.get("urlJogos");
    setJogos(response.data);
    setCriarJogo(false);
  }

  async function handleEditar(id: string) {
    await api.put(`urlJogos/${id}`, dadosFormEditar);
    salvarJogoEditar();
  }

  async function handleCriar() {
    await api.post(`/admin/matches-results`, dadosFormCriar);
    salvarJogoCriar();
  }

  const timesDoGrupoCriar = times.filter(
    (time) => time.grupo == dadosFormCriar.grupo,
  );
  const timesDoGrupoEditar = times.filter(
    (time) => time.grupo == dadosFormEditar.grupo,
  );

  function ganhador(golsA: number, golsB: number, data: string) {
    if (golsA > golsB) {
      return "Casa venceu";
    } else if (golsA < golsB) {
      return "Visitante venceu";
    } else if (golsA === golsB) {
      if (new Date(data) < new Date()) {
        return "Empate";
      } else {
        return "Partida não realizada";
      }
    }
  }

  return (
    <>
      <div className="division-header-page">
        <HeaderAdmin />
        <main>
          <div className="dashboard-header">
            <h4 className="title-dashboard">Jogos</h4>
          </div>
          <div className="jogos-admin-main">
            <div className="button-jogos-admin">
              <button
                className="addjogo-button"
                onClick={() => setCriarJogo(!criarJogo)}
              >
                + Novo jogo
              </button>
            </div>
            <div className="jogos-container-admin">
              <div className="titulo-jogos-admin">
                <p className="partida-jogos-admin">PARTIDA</p>
                <p className="placar-jogos-admin">PLACAR</p>
                <p className="estadio-jogos-admin">ESTÁDIO</p>
              </div>
              {jogos.map((jogo) => (
                <div key={jogo.id} className="jogo-admin">
                  <div className="infos-times-jogo-admin">
                    <p className="imagem-jogo-time-admin">
                      {times.find((t) => t.id === jogo.timeA)?.abreviacao}
                    </p>
                    <img
                      className="jogo-nome-time-admin"
                      src={times.find((t) => t.id === jogo.timeB)?.escudoUrl}
                      alt="Escudo Casa"
                    />
                    <p className="jogo-admin-versus">vs</p>
                    <p className="jogo-nome-time-admin">
                      {times.find((t) => t.id === jogo.timeA)?.abreviacao}
                    </p>
                    <img
                      className="imagem-jogo-time-admin"
                      src={times.find((t) => t.id === jogo.timeB)?.escudoUrl}
                      alt="Escudo Fora"
                    />
                    <p className="grupo-jogo-admin">GRP {jogo.grupo}</p>
                  </div>
                  <div className="placar-resultado-jogo-admin">
                    <div className="placar-jogo-admin">
                      <p className="placar-time1-jogo-admin">
                        {resultado.find((r) => r.id === jogo.id)?.placarTimeA}
                      </p>
                      <p>-</p>
                      <p className="placar-time2-jogo-admin">
                        {resultado.find((r) => r.id === jogo.id)?.placarTimeB}
                      </p>
                    </div>
                    <div className="resultado-jogo-admin">
                      <p>
                        {ganhador(
                          resultado.find((r) => r.id === jogo.id)
                            ?.placarTimeA || 0,
                          resultado.find((r) => r.id === jogo.id)
                            ?.placarTimeB || 0,
                          jogo.data,
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="estadio-jogo-admin">{jogo.estadio}</p>
                  <div className="buttons-jogo-admin">
                    <button
                      className="editar-button-admin"
                      onClick={() => {
                        setEditarJogo(!editarJogo);
                        setJogoEditando(jogo);
                      }}
                    >
                      <EditarIcone />
                    </button>
                    <button
                      className="deletar-jogo-admin"
                      onClick={() => deletarJogo(jogo.id)}
                    >
                      <ApagarIcone />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {editarJogo && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="title-modal">
                    <h4 className="text-title-modal">Editar Jogo</h4>
                    <button
                      className="close-modal"
                      onClick={() => setEditarJogo(!editarJogo)}
                    >
                      <FecharModalIcone />
                    </button>
                  </div>

                  <div className="modal-inputs">
                    <div className="">
                      <div>
                        <label>Selecione o grupo</label>
                        <br />
                        <select
                          className="selecionar-grupo-admin"
                          value={dadosFormEditar.grupo}
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              grupo: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecionar Grupo</option>

                          {grupos.map((grupo) => (
                            <option key={grupo.id} value={grupo.nome}>
                              {grupo.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="selecionar-times-modal">
                        <div>
                          <label>Selecione o time da casa</label>
                          <br />
                          <select
                            className="selecionar-time1-admin"
                            value={dadosFormEditar.TimeNome1}
                            onChange={(e) =>
                              setDadosFormEditar({
                                ...dadosFormEditar,
                                TimeNome1: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecionar Time 1</option>
                            {timesDoGrupoEditar.map((time) => {
                              return (
                                <option key={time.id} value={time.nome}>
                                  {time.nome}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <label>Selecione o time visitante</label>
                          <br />
                          <select
                            className="selecionar-time2-admin"
                            value={dadosFormEditar.TimeNome2}
                            onChange={(e) =>
                              setDadosFormEditar({
                                ...dadosFormEditar,
                                TimeNome2: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecionar Time 2</option>

                            {timesDoGrupoEditar.map((time) => (
                              <option key={time.id} value={time.nome}>
                                {time.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="selecionar-gols-admin">
                        <div>
                          <label>Gols casa</label>
                          <br />
                          <input
                            type="number"
                            className="input-modal-gol"
                            value={dadosFormEditar.golsTime1}
                            onChange={(e) =>
                              setDadosFormEditar({
                                ...dadosFormEditar,
                                golsTime1:
                                  e.target.value === ""
                                    ? 0
                                    : Number(e.target.value),
                              })
                            }
                          ></input>
                        </div>
                        <div>
                          <label>Gols visitante</label>
                          <br />
                          <input
                            type="number"
                            className="input-modal-gol"
                            value={dadosFormEditar.golsTime2}
                            onChange={(e) =>
                              setDadosFormEditar({
                                ...dadosFormEditar,
                                golsTime2:
                                  e.target.value === ""
                                    ? 0
                                    : Number(e.target.value),
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="estadio-date-input-modal">
                        <div className="selecionar-estadio-jogo-admin">
                          <label>Selecione o estádio</label>
                          <br />
                          <select
                            className="selecionar-estadio-admin"
                            value={dadosFormEditar.estadio}
                            onChange={(e) =>
                              setDadosFormEditar({
                                ...dadosFormEditar,
                                estadio: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecionar Estádio</option>
                            {estadios.map((estadio) => (
                              <option value={estadio.nome} key={estadio.id}>
                                {estadio.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="selecionar-data-jogo-admin">
                          <label>Selecione a data do jogo</label>
                          <br />
                          <input
                            type="date"
                            className="input-modal-date"
                            value={dadosFormEditar.data}
                            onChange={(e) =>
                              setDadosFormEditar({
                                ...dadosFormEditar,
                                data: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="modal-enviar">
                        <button
                          className="enviar-modal"
                          onClick={() =>
                            jogoEditando && handleEditar(jogoEditando.id)
                          }
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {criarJogo && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="title-modal">
                    <h4 className="text-title-modal">Criar Jogo</h4>
                    <button
                      className="close-modal"
                      onClick={() => setCriarJogo(!criarJogo)}
                    >
                      <FecharModalIcone />
                    </button>
                  </div>
                  <div className="modal-inputs">
                    <div className="">
                      <div>
                        <label>Selecione o grupo</label>
                        <br />
                        <select
                          className="selecionar-grupo-admin"
                          value={dadosFormCriar.grupo}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              grupo: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecionar Grupo</option>
                          {grupos.map((grupo) => (
                            <option key={grupo.id} value={grupo.nome}>
                              {grupo.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="selecionar-times-modal">
                        <div>
                          <label>Selecione o time da casa</label>
                          <br />
                          <select
                            className="selecionar-time1-admin"
                            value={dadosFormCriar.TimeNome1}
                            onChange={(e) =>
                              setDadosFormCriar({
                                ...dadosFormCriar,
                                TimeNome1: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecionar Time 1</option>
                            {timesDoGrupoCriar.map((time) => (
                              <option value={time.nome} key={time.id}>
                                {time.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label>Selecione o time visitante</label>
                          <br />
                          <select
                            className="selecionar-time2-admin"
                            value={dadosFormCriar.TimeNome2}
                            onChange={(e) =>
                              setDadosFormCriar({
                                ...dadosFormCriar,
                                TimeNome2: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecionar Time 2</option>
                            {timesDoGrupoCriar.map((time) => (
                              <option value={time.nome} key={time.id}>
                                {time.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="selecionar-gols-admin">
                        <div>
                          <label>Gols casa</label>
                          <br />
                          <input
                            type="number"
                            className="input-modal-gol"
                            value={dadosFormCriar.golsTime1}
                            onChange={(e) =>
                              setDadosFormCriar({
                                ...dadosFormCriar,
                                golsTime1: parseInt(e.target.value) || 0,
                              })
                            }
                          ></input>
                        </div>
                        <div>
                          <label>Gols visitante</label>
                          <br />
                          <input
                            type="number"
                            className="input-modal-gol"
                            value={dadosFormCriar.golsTime2}
                            onChange={(e) =>
                              setDadosFormCriar({
                                ...dadosFormCriar,
                                golsTime2: parseInt(e.target.value) || 0,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="estadio-date-input-modal">
                        <div className="selecionar-estadio-jogo-admin">
                          <label>Selecione o estádio</label>
                          <br />
                          <select
                            className="selecionar-estadio-admin"
                            value={dadosFormCriar.estadio}
                            onChange={(e) =>
                              setDadosFormCriar({
                                ...dadosFormCriar,
                                estadio: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecionar Estádio</option>
                            {estadios.map((estadio) => (
                              <option value={estadio.nome} key={estadio.id}>
                                {estadio.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="selecionar-data-jogo-admin">
                          <label>Selecione a data do jogo</label>
                          <br />
                          <input
                            type="date"
                            className="input-modal-date"
                            value={dadosFormCriar.data}
                            onChange={(e) =>
                              setDadosFormCriar({
                                ...dadosFormCriar,
                                data: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="modal-enviar">
                        <button
                          className="enviar-modal"
                          onClick={() => handleCriar()}
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
