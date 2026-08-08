import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import { ApagarIcone, EditarIcone } from "../Noticias/icones";
import "./estadio.css";
import axios from "axios";
import FecharModalIcone from "../Jogos/icones";

export interface Estadio {
  id: string;
  nome: string;
  cidade: string;
  capacidade: number;
  criadoEm: string;
  atualizadoEm: string;
}

export interface dadosFormEstadio {
  nome: string;
  cidade: string;
  capacidade: number;
}

export default function EstadiosAdmin() {
  const [mostrarEstadioEditar, setMostrarEstadioEditar] =
    useState<boolean>(false);
  const [mostrarEstadioCriar, setMostrarEstadioCriar] =
    useState<boolean>(false);
  const [estadioEditando, setEstadioEditando] = useState<Estadio | null>(null);
  const [estadios, setEstadios] = useState<Estadio[]>([]);
  const [dadosFormCriarEstadio, setDadosFormCriarEstadio] =
    useState<dadosFormEstadio>({
      nome: "",
      cidade: "",
      capacidade: 0,
    });
  const [dadosFormEditarEstadio, setDadosFormEditarEstadio] =
    useState<dadosFormEstadio>({
      nome: "",
      cidade: "",
      capacidade: 0,
    });

  useEffect(() => {
    if (estadioEditando) {
      setDadosFormEditarEstadio({
        nome: estadioEditando.nome,
        cidade: estadioEditando.cidade,
        capacidade: estadioEditando.capacidade,
      });
    }
  }, [estadioEditando]);

  useEffect(() => {
    async function carregarEstadios() {
      const response = await axios.get("urlEstadios");
      return setEstadios(response.data);
    }
    carregarEstadios();
  }, []);

  async function deletarEstadio(publicId: string) {
    await axios.delete(`/admin/stadiums/${publicId}`);
    let novosEstadios = estadios.filter((estadio) => estadio.id != publicId);
    setEstadios(novosEstadios);
  }

  async function handleCriar() {
    await axios.post("/admin/stadiums", dadosFormCriarEstadio);
    const response = await axios.get("urlEstadios");
    setEstadios(response.data);
    setMostrarEstadioCriar(false);
  }

  async function handleEditar() {
    if (!estadioEditando) return;
    await axios.put(
      `/admin/stadiums/${estadioEditando.id}`,
      dadosFormEditarEstadio,
    );
    const response = await axios.get("urlEstadios");
    setEstadios(response.data);
    setMostrarEstadioEditar(false);
    setEstadioEditando(null);
  }

  return (
    <>
      <div className="division-header-page" style={{ position: "relative" }}>
        <HeaderAdmin />
        <main>
          <div className="dashboard-header">
            <h4 className="title-dashboard">Estádios</h4>
          </div>
          <div className="estadios-admin-page">
            <div className="button-estadios-div">
              <button
                className="addstadium-button-admin"
                onClick={() => setMostrarEstadioCriar(!mostrarEstadioCriar)}
              >
                + Novo estádio
              </button>
            </div>
            <div className="estadios-admin-list">
              <div className="estadios-titulo-admin">
                <p className="estadio-titulo-admin">ESTÁDIO</p>
                <p className="cidade-estadio-admin">CIDADE</p>
                <p className="capacidade-estadio-admin">CAPACIDADE</p>
              </div>
              <div className="todos-estadios-admin">
                {estadios.map((estadio) => (
                  <div className="estadios-admin">
                    <div className="estadio-admin">
                      <p className="estadio-titulo-admin-bd">{estadio.nome}</p>
                      <p className="cidade-estadio-admin-bd">
                        {estadio.cidade}
                      </p>
                      <p className="capacidade-estadio-admin-bd">
                        {estadio.capacidade}
                      </p>
                    </div>
                    <div className="icones-pagina-estadio-admin">
                      <button className="icone-estadio-editar-admin">
                        <EditarIcone />
                      </button>
                      <button
                        className="icone-estadio-apagar-admin"
                        onClick={() => deletarEstadio(estadio.id)}
                      >
                        <ApagarIcone />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {mostrarEstadioEditar && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="title-modal">
                  <h4 className="text-title-modal">Editar Estadios</h4>
                  <button
                    className="close-modal"
                    onClick={() =>
                      setMostrarEstadioEditar(!mostrarEstadioEditar)
                    }
                  >
                    <FecharModalIcone />
                  </button>
                </div>
                <div className="modal-inputs-estadios">
                  <div className="nome-cidade-estadio-modal-admin">
                    <div>
                      <label>Nome do estádio</label>
                      <br />
                      <input
                        type="text"
                        className="input-modal-estadio"
                        onChange={(e) =>
                          setDadosFormEditarEstadio({
                            ...dadosFormEditarEstadio,
                            nome: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                    <div>
                      <label>Cidade</label>
                      <br />
                      <input
                        type="text"
                        className="input-modal-estadio"
                        onChange={(e) =>
                          setDadosFormEditarEstadio({
                            ...dadosFormEditarEstadio,
                            cidade: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Capacidade</label>
                    <br />
                    <input
                      type="number"
                      className="input-modal-estadio"
                      onChange={(e) =>
                        setDadosFormEditarEstadio({
                          ...dadosFormEditarEstadio,
                          capacidade: Number(e.target.value),
                        })
                      }
                    ></input>
                  </div>
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
          )}
          {mostrarEstadioCriar && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="title-modal">
                  <h4 className="text-title-modal">Criar Estadios</h4>
                  <button
                    className="close-modal"
                    onClick={() => setMostrarEstadioCriar(!mostrarEstadioCriar)}
                  >
                    <FecharModalIcone />
                  </button>
                </div>
                <div className="modal-inputs-estadios">
                  <div className="nome-cidade-estadio-modal-admin">
                    <div>
                      <label>Nome do estádio</label>
                      <br />
                      <input
                        type="text"
                        className="input-modal-estadio"
                        onChange={(e) =>
                          setDadosFormCriarEstadio({
                            ...dadosFormCriarEstadio,
                            nome: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                    <div>
                      <label>Cidade</label>
                      <br />
                      <input
                        type="text"
                        className="input-modal-estadio"
                        onChange={(e) =>
                          setDadosFormCriarEstadio({
                            ...dadosFormCriarEstadio,
                            cidade: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Capacidade</label>
                    <br />
                    <input
                      type="number"
                      className="input-modal-estadio"
                      onChange={(e) =>
                        setDadosFormCriarEstadio({
                          ...dadosFormCriarEstadio,
                          capacidade: Number(e.target.value),
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
                    Criar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
