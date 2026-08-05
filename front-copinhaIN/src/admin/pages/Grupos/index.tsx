import { useEffect, useState } from "react";
import "./grupos.css";
import HeaderAdmin from "../../components/header/header";
import { LixoIcon } from "./icones";
import axios from "axios";

export interface Grupo {
  publicId: string;
  nome: string;
  posicaoRank: number;
  dataCriacao: string;
  dataUltimaAlteracao: string;
}

export default function Grupos() {
  const [mostrar, setMostrar] = useState<boolean>(false);

  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    async function carregarGrupos() {
      const response = await axios.get("urlGrupos");
      return setGrupos(response.data);
    }
    carregarGrupos();
  }, []);

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
              <button
                className="addgroup-button"
                onClick={() => setMostrar(!mostrar)}
              >
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
                  <div key={grupo.publicId} className="grupo">
                    <p className="title-grupo">{grupo.nome}</p>
                    <p>{grupo.dataCriacao}</p>
                    <LixoIcon />
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
