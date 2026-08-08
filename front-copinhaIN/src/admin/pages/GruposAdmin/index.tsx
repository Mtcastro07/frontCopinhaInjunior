import { useEffect, useState } from "react";
import "./grupos.css";
import HeaderAdmin from "../../components/header/header";
import { LixoIcon } from "./icones";
import axios from "axios";
import FecharModalIcone from "../Jogos/icones";
import type { Time } from "../Times";

export interface Grupo {
  id: string;
  nome: string;
  criadoEm: string;
  atualizadoEm: string;
  timeUm: string;
  timeDois: string;
  timeTres: string;
  timeQuatro: string;
}

const grupoVazio: Grupo = {
  id: "",
  nome: "",
  criadoEm: "",
  atualizadoEm: "",
  timeUm: "",
  timeDois: "",
  timeTres: "",
  timeQuatro: "",
};

export default function GruposGerenciar() {
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);
  const [times, setTimes] = useState<Time[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [dadosFormCriar, setDadosFormCriar] = useState<Grupo>(grupoVazio);

  useEffect(() => {
    async function carregarTimes() {
      const response = await axios.get("urlTimes");
      return setTimes(response.data);
    }
    carregarTimes();
  }, []);

  useEffect(() => {
    async function carregarGrupos() {
      const response = await axios.get("urlGrupos");
      return setGrupos(response.data);
    }
    carregarGrupos();
  }, []);

  function abrirCriarGrupo() {
    setDadosFormCriar(grupoVazio);
    setModoEdicao(false);
    setMostrarModal(true);
  }

  function abrirEditarGrupo(grupo: Grupo) {
    setDadosFormCriar(grupo);
    setModoEdicao(true);
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
    setDadosFormCriar(grupoVazio);
    setModoEdicao(false);
  }

  async function handleCriar() {
    await axios.post("/admin/groups", dadosFormCriar);
    const response = await axios.get("urlGrupos");
    setGrupos(response.data);
    fecharModal();
  }

  async function handleAlterarTimes() {
    await axios.patch(`/admin/groups/${dadosFormCriar.id}`, {
      timeUm: dadosFormCriar.timeUm,
      timeDois: dadosFormCriar.timeDois,
      timeTres: dadosFormCriar.timeTres,
      timeQuatro: dadosFormCriar.timeQuatro,
    });
    const response = await axios.get("urlGrupos");
    setGrupos(response.data);
    fecharModal();
  }

  async function handleSalvar() {
    if (modoEdicao) {
      await handleAlterarTimes();
    } else {
      await handleCriar();
    }
  }

  async function handleApagar(id: string) {
    await axios.delete(`/admin/groups/${id}`);
    const response = await axios.get("urlGrupos");
    setGrupos(response.data);
  }

  return (
    <>
      <div className="division-header-page">
        <HeaderAdmin />
        <main>
          <div className="dashboard-header">
            <h4 className="title-dashboard">Gerenciar Grupos</h4>
          </div>
          <div className="grupos-main-page">
            <div className="button-add-grupo">
              <button className="addgroup-button" onClick={abrirCriarGrupo}>
                + Novo grupo
              </button>
            </div>
            <div className="grupo-container">
              <div className="grupo-infos">
                <p>GRUPO</p>
                <p>CRIADO EM</p>
              </div>
              <div className="list-grupo">
                {grupos.map((grupo) => (
                  <div key={grupo.id} className="grupo">
                    <p className="title-grupo">{grupo.nome}</p>
                    <p className="date-grupo-admin">{grupo.criadoEm}</p>
                    <button
                      className="button-editar-grupo-admin"
                      onClick={() => abrirEditarGrupo(grupo)}
                    >
                      Editar
                    </button>
                    <button
                      className="button-deletar-grupo-admin"
                      onClick={() => handleApagar(grupo.id)}
                    >
                      <LixoIcon />
                    </button>
                  </div>
                ))}
              </div>
              {mostrarModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="title-modal">
                      <h4 className="text-title-modal">
                        {modoEdicao ? "Editar Grupo" : "Criar Grupo"}
                      </h4>
                      <button className="close-modal" onClick={fecharModal}>
                        <FecharModalIcone />
                      </button>
                    </div>
                    <div className="grupo-modal-content">
                      <div>
                        <label>Nome do grupo</label>
                        <br />
                        <input
                          type="text"
                          className="input-nome-modal-grupo"
                          value={dadosFormCriar.nome}
                          disabled={modoEdicao}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              nome: e.target.value,
                            })
                          }
                        />
                      </div>
                      <label>Selecione os 4 times:</label>
                      <div className="first-times-modal">
                        <select
                          className="select-modal-grupo"
                          value={dadosFormCriar.timeUm}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              timeUm: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione o primeiro</option>
                          {times.map((time) => (
                            <option key={time.id} value={time.id}>
                              {time.nome}
                            </option>
                          ))}
                        </select>
                        <select
                          className="select-modal-grupo"
                          value={dadosFormCriar.timeDois}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              timeDois: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione o segundo</option>
                          {times.map((time) => (
                            <option key={time.id} value={time.id}>
                              {time.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="second-times-modal">
                        <select
                          className="select-modal-grupo"
                          value={dadosFormCriar.timeTres}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              timeTres: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione o terceiro</option>
                          {times.map((time) => (
                            <option key={time.id} value={time.id}>
                              {time.nome}
                            </option>
                          ))}
                        </select>
                        <select
                          className="select-modal-grupo"
                          value={dadosFormCriar.timeQuatro}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              timeQuatro: e.target.value,
                            })
                          }
                        >
                          <option value="">Selecione o quarto</option>
                          {times.map((time) => (
                            <option key={time.id} value={time.id}>
                              {time.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="modal-enviar">
                      <button className="enviar-modal" onClick={handleSalvar}>
                        {modoEdicao ? "Salvar" : "Criar"}
                      </button>
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
