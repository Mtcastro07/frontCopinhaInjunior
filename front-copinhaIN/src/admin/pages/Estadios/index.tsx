import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import { ApagarIcone, EditarIcone } from "../Noticias/icones";
import "./estadio.css";
import axios from "axios";

export interface Estadio {
  id: string;
  nome: string;
  cidade: string;
  capacidade: number;
  criadoEm: string;
  atualizadoEm: string;
}

export default function EstadiosAdmin() {
  const [mostrarEstadio, setMostrarEstadio] = useState<boolean>(false);
  const [estadios, setEstadios] = useState<Estadio[]>([]);

  useEffect(() => {
    async function carregarEstadios() {
      const response = await axios.get("urlEstadio");
      return setEstadios(response.data);
    }
    carregarEstadios();
  }, []);

  async function deletarEstadio(publicId: string) {
    await axios.delete(`urlEstadios/${publicId}`);
    let novosEstadios = estadios.filter((estadio) => estadio.id != publicId);
    setEstadios(novosEstadios);
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
                onClick={() => setMostrarEstadio(!mostrarEstadio)}
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
        </main>
      </div>
    </>
  );
}
