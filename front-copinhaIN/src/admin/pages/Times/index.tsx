import { useState } from "react";
import HeaderAdmin from "../../components/header/header";
import "./times.css";

export default function Times() {
  const [mostrarAddtimes, setMostrarAddtimes] = useState<boolean>(false);
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
            <div className="times-main-page">
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
                <div className="time">
                  <div className="logo-grupo-time">
                    <div className="logo-nome">
                      <p>🇧🇷</p>
                      <div className="name-username-time">
                        <p className="name-time">Brasil</p>
                        <p className="username-time">BRA</p>
                      </div>
                    </div>
                    <div className="grupo-time">
                      <p>GRP A</p>
                    </div>
                  </div>
                  <div className="pontuacoes-time">
                    <p>2</p>
                    <p>1</p>
                    <p>0</p>
                  </div>
                  <div className="pontosTotais-time">
                    <p>7</p>
                  </div>
                  <div className="buttons-edit-delete-time">
                    <p>editar</p>
                    <p>lixo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
