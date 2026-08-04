import HeaderAdmin from "../../components/header/header";
import "./dashboard.css";
import NoticiaIcon from "./icons/noticiaIcon";
import useContagem from "../../hooks/useContagem";
import { useEffect, useState } from "react";
import CheckIcon from "./icons/checkIcon";
import Escudo from "./icons/escudoIcon";
import EstadioIcon from "./icons/estadioIcon";
import axios from "axios";

export default function Dashboard() {
  const [qntdNoticias, setQntdNoticas] = useState<number>(0);
  const [qntdTimes, setQntdTimes] = useState<number>(0);
  const [qntdEstadios, setQntdEstadios] = useState<number>(0);
  const [qntdGrupos, setQntdGrupos] = useState<number>(0);
  const [qntdJogos, setQntdJogos] = useState<number>(0);
  const [qntdJogosAgendados, setQntdJogosAgendados] = useState<number>(0);

  useContagem(setQntdNoticas, "urlNoticias");
  useContagem(setQntdTimes, "urlTimes");
  useContagem(setQntdJogos, "urlJogos");
  useContagem(setQntdEstadios, "urlEstadios");

  useEffect(() => {
    async function filtrarJogosAgendados() {
      const response = await axios.get("urlJogos");
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
            <div className="latestNews-dashboard">
              <div className="latestNews-header">
                <NoticiaIcon />
                <p className="latestNews-title-header">ÚLTIMAS NOTÍCIAS</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
