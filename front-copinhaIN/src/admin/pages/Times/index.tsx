import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import "./times.css";
import { LixoIcon } from "../GruposAdmin/icones";
import { EditarIcon } from "./icones";
import axios from "axios";
import { EditarIcone } from "../Noticias/icones";
import FecharModalIcone from "../Jogos/icones";
import type { Grupo } from "../GruposAdmin/index";

export interface Time {
  id: string;
  grupo: string;
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

export interface camposTime {
  nome: string;
  abreviacao: string;
  grupo: string;
  escudoUrl: string;
  vitorias: number;
  empates: number;
  derrotas: number;
  pontos: number;
}
export default function Times() {
  const [mostrarEditarTime, setMostrarEditarTime] = useState<boolean>(false);
  const [mostrarCriarTime, setMostrarCriarTime] = useState<boolean>(false);
  const [arquivoCriar, setArquivoCriar] = useState<File | null>(null);
  const [arquivoEditar, setArquivoEditar] = useState<File | null>(null);
  const [teams, setTeams] = useState<Time[]>([]);
  const [editandoTime, setEditandoTime] = useState<Time | null>(null);
  const [dadosFormCriar, setDadosFormCriar] = useState<camposTime>({
    nome: "",
    abreviacao: "",
    grupo: "",
    escudoUrl: "",
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    pontos: 0,
  });
  const [dadosFormEditar, setDadosFormEditar] = useState<camposTime>({
    nome: "",
    abreviacao: "",
    grupo: "",
    escudoUrl: "",
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    pontos: 0,
  });

  useEffect(() => {
    if (editandoTime) {
      setDadosFormEditar({
        nome: editandoTime.nome,
        abreviacao: editandoTime.abreviacao,
        grupo: editandoTime.grupo,
        escudoUrl: editandoTime.escudoUrl,
        vitorias: editandoTime.vitorias,
        empates: editandoTime.empates,
        derrotas: editandoTime.derrotas,
        pontos:
          editandoTime.vitorias * 2 +
          editandoTime.empates -
          editandoTime.derrotas,
      });
    }
  }, [editandoTime]);

  useEffect(() => {
    async function carregarTime() {
      const response = await axios.get("urlTimes");
      return setTeams(response.data);
    }
    carregarTime();
  }, []);

  async function handleUpload(arquivo: File): Promise<string> {
    const formData = new FormData();
    formData.append("urlImagemEscudo", arquivo);

    const response = await axios.post("/admin/teams", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.urlImagemEscudo;
  }

  async function handleEditar() {
    let urlEscudo = dadosFormEditar.escudoUrl;

    if (arquivoEditar) {
      urlEscudo = await handleUpload(arquivoEditar);
    }

    await axios.put(`/admin/teams/${editandoTime?.id}`, {
      ...dadosFormEditar,
      escudoUrl: urlEscudo,
    });
    const response = await axios.get("urlTimes");
    setTeams(response.data);
    setMostrarEditarTime(!mostrarEditarTime);
    setEditandoTime(null);
    setArquivoEditar(null);
  }

  async function handleCriar() {
    let urlEscudo = dadosFormCriar.escudoUrl;

    if (arquivoCriar) {
      urlEscudo = await handleUpload(arquivoCriar);
    }

    await axios.post(`/admin/teams`, {
      ...dadosFormCriar,
      escudoUrl: urlEscudo,
    });
    const response = await axios.get("urlTimes");
    setTeams(response.data);
    setMostrarCriarTime(!mostrarCriarTime);
    setArquivoCriar(null);
  }

  async function handleApagar(id: string) {
    await axios.delete(`/admin/teams/${id}`);
    const response = await axios.get(`urlTimes`);
    setTeams(response.data);
  }

  const pontosTotalEditar =
    dadosFormEditar.vitorias * 2 +
    dadosFormEditar.empates -
    dadosFormEditar.derrotas;
  const pontosTotalCriar =
    dadosFormCriar.vitorias * 2 +
    dadosFormCriar.empates -
    dadosFormCriar.derrotas;

  return (
    <>
      <div className="division-header-page">
        <HeaderAdmin />
        <main>
          <div className="dashboard-header">
            <h4 className="title-dashboard">Times</h4>
          </div>
          <div className="times-main-page">
            <div className="button-add-time">
              <button
                className="addtime-button"
                onClick={() => setMostrarCriarTime(!mostrarCriarTime)}
              >
                + Novo time
              </button>
            </div>

            <div className="times-list">
              <div className="title-list-times">
                <div className="selec-grupo">
                  <p>SELEÇÃO</p>
                  <p>GRUPO</p>
                </div>
                <div className="pontuacoes-times">
                  <p>V</p>
                  <p>E</p>
                  <p>D</p>
                </div>
                <p>PTS</p>
              </div>
              {teams.map((team) => (
                <div className="time" key={team.id}>
                  <div className="logo-grupo-time">
                    <div className="logo-nome">
                      <img
                        src={team.escudoUrl}
                        alt="escudo"
                        className="img-escudo-time-modal"
                      ></img>
                      <div className="name-username-time">
                        <p className="name-time">{team.nome}</p>
                        <p className="username-time">{team.abreviacao}</p>
                      </div>
                    </div>
                    <div className="grupo-time">
                      <p>GRP {team.grupo}</p>
                    </div>
                  </div>
                  <div className="pontuacoes-time">
                    <p>{team.vitorias}</p>
                    <p>{team.empates}</p>
                    <p>{team.derrotas}</p>
                  </div>
                  <div className="pontosTotais-time">
                    <p>{team.pontos}</p>
                  </div>
                  <div className="buttons-edit-delete-time">
                    <button
                      className="button-time-admin"
                      onClick={() => handleApagar(team.id)}
                    >
                      <LixoIcon />
                    </button>
                    <button
                      className="button-time-admin"
                      onClick={() => {
                        setMostrarEditarTime(!mostrarEditarTime);
                        setEditandoTime(team);
                      }}
                    >
                      <EditarIcon />
                    </button>
                  </div>
                </div>
              ))}

              {mostrarEditarTime && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="title-modal">
                      <h4 className="text-title-modal">Editar Time</h4>
                      <button
                        className="close-modal"
                        onClick={() => setMostrarEditarTime(!mostrarEditarTime)}
                      >
                        <FecharModalIcone />
                      </button>
                    </div>
                    <div className="nome-sigla-time-modal">
                      <div>
                        <label>Nome da Seleção</label>
                        <input
                          type="text"
                          value={dadosFormEditar.nome}
                          className="input-modal-time"
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              nome: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Nome abreviação</label>
                        <input
                          value={dadosFormEditar.abreviacao}
                          type="text"
                          className="input-modal-time"
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              abreviacao: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Imagem escudo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setArquivoEditar(e.target.files?.[0] ?? null)
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="pontos-modal">
                      <label>
                        Coloque o numero de vitorias, empates e derrotas
                      </label>
                      <div className="pontuacoes-modal">
                        <input
                          value={dadosFormEditar.vitorias}
                          type="number"
                          className="input-modal-pontos"
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              vitorias: Number(e.target.value),
                            })
                          }
                        ></input>
                        <input
                          value={dadosFormEditar.empates}
                          type="number"
                          className="input-modal-pontos"
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              empates: Number(e.target.value),
                            })
                          }
                        ></input>
                        <input
                          value={dadosFormEditar.derrotas}
                          type="number"
                          className="input-modal-pontos"
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              derrotas: Number(e.target.value),
                            })
                          }
                        ></input>
                      </div>
                      <div className="grupo-time-modal">
                        <label>Qual será seu grupo</label>
                        <br />
                        <input
                          value={dadosFormEditar.grupo}
                          className="input-modal-time"
                          onChange={(e) =>
                            setDadosFormEditar({
                              ...dadosFormEditar,
                              grupo: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div className="pontos-modal-time">
                        <label>Pontos Totais</label>
                        <p>{pontosTotalEditar}</p>
                      </div>
                      <div className="modal-enviar">
                        <button
                          className="enviar-modal"
                          onClick={() => handleEditar()}
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {mostrarCriarTime && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="title-modal">
                      <h4 className="text-title-modal">Criar Time</h4>
                      <button
                        className="close-modal"
                        onClick={() => setMostrarCriarTime(!mostrarCriarTime)}
                      >
                        <FecharModalIcone />
                      </button>
                    </div>
                    <div className="nome-sigla-time-modal">
                      <div>
                        <label>Nome da Seleção</label>
                        <input
                          value={dadosFormCriar.nome}
                          type="text"
                          className="input-modal-time"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              nome: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Nome abreviação</label>
                        <input
                          value={dadosFormCriar.abreviacao}
                          type="text"
                          className="input-modal-time"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              abreviacao: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div>
                        <label>imagem do escudo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setArquivoCriar(e.target.files?.[0] ?? null)
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="pontos-modal">
                      <label>
                        Coloque o numero de vitorias, empates e derrotas
                      </label>
                      <div className="pontuacoes-modal">
                        <input
                          value={dadosFormCriar.vitorias}
                          type="number"
                          className="input-modal-pontos"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              vitorias: Number(e.target.value),
                            })
                          }
                        ></input>
                        <input
                          value={dadosFormCriar.empates}
                          type="number"
                          className="input-modal-pontos"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              empates: Number(e.target.value),
                            })
                          }
                        ></input>
                        <input
                          value={dadosFormCriar.derrotas}
                          type="number"
                          className="input-modal-pontos"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              derrotas: Number(e.target.value),
                            })
                          }
                        ></input>
                      </div>
                      <div className="grupo-time-modal">
                        <label>Qual será seu grupo</label>
                        <br />
                        <input
                          value={dadosFormCriar.grupo}
                          className="input-modal-time"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              grupo: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div className="pontos-modal-time">
                        <label>Pontos Totais</label>
                        <p>{pontosTotalCriar}</p>
                      </div>
                      <div className="modal-enviar">
                        <button
                          className="enviar-modal"
                          onClick={() => handleCriar()}
                        >
                          Criar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
