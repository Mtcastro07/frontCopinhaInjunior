import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import "./times.css";
import { LixoIcon } from "../Grupos/icones";
import { EditarIcon } from "./icones";
import axios from "axios";

export interface Time {
  id: string;
  idGrupo: number;
  publicId: number;
  nome: string;
  sigla: string;
  urlImagemEscudo: string;
  posicaoGrupo: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldo: number;
  pontos: number;
  dataCriacao: number;
  dateUltimaAlteracao: number;
}

export default function Times() {
  const [mostrarAddtimes, setMostrarAddtimes] = useState<boolean>(false);
  const [teams, setTeams] = useState<Time[]>([]);

  useEffect(() => {
    async function carregarTime() {
      const response = await axios.get("urlTimes");
      return setTeams(response.data);
    }
    carregarTime();
  }, []);

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
                className="addgroup-button"
                onClick={() => setMostrarAddtimes(!mostrarAddtimes)}
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
                <div className="time">
                  <div className="logo-grupo-time">
                    <div className="logo-nome">
                      <p>🇧🇷</p>
                      <div className="name-username-time">
                        <p className="name-time">{team.nome}</p>
                        <p className="username-time">{team.sigla}</p>
                      </div>
                    </div>
                    <div className="grupo-time">
                      <p>GRP {team.idGrupo}</p>
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
                    <p>
                      <LixoIcon />
                    </p>
                    <p>
                      <EditarIcon />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
