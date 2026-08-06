import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import "./noticias.css";
import { EditarIcone } from "./icones";
import { ApagarIcone } from "./icones";
import type { Noticia } from "../Dashboard";
import axios from "axios";

export default function NoticiasGerenciar() {
  const [mostrarModalNoticias, setMostrarModalNoticias] =
    useState<boolean>(false);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const response = await axios.get(`urlNoticias?titulo=${termoBusca}`);
      setNoticias(response.data);
    }, 500);

    return () => clearTimeout(timer);
  }, [termoBusca]);

  useEffect(() => {
    async function carregarNoticias() {
      const response = await axios.get("urlNoticias");
      return setNoticias(response.data);
    }
    carregarNoticias();
  }, []);

  async function deletarUser(publicId: string) {
    await axios.delete(`urlDelecao/${publicId}`);
    let noticiasAtualizadas = noticias.filter(
      (noticiaDesejada) => noticiaDesejada.publicId != publicId,
    );
    setNoticias(noticiasAtualizadas);
  }

  return (
    <>
      <div className="division-header-page">
        <HeaderAdmin />
        <main>
          <div className="dashboard-header">
            <h4 className="title-dashboard">Gerenciar Noticias</h4>
          </div>
          <div className="noticias-admin-page">
            <div className="noticias-admin-inputs">
              <input
                className="noticias-admin-input"
                placeholder="Buscar noticias..."
                type="text"
                onChange={(e) => setTermoBusca(e.target.value)}
              ></input>
              <button
                className="addnoticia-button"
                onClick={() => setMostrarModalNoticias(!mostrarModalNoticias)}
              >
                + Nova notícia
              </button>
            </div>
            <div className="noticias-admin-container">
              <div className="noticias-admin-titulo-autor">
                <p>TÍTULO</p>
                <p>AUTOR</p>
              </div>
              <div className="lista-noticias-admin">
                {noticias.map((noticia) => (
                  <div className="noticia-admin">
                    <div className="imagem-titulo-noticia-admin">
                      <img
                        className="imagem-noticia-admin"
                        src={noticia.urlImagemCapa}
                        alt="imagem-noticia"
                      ></img>
                      <p className="titulo-noticia-admin">{noticia.titulo}</p>
                    </div>
                    <p className="autor-noticia-admin">{noticia.autor}</p>
                    <div className="noticia-admin-icons">
                      <button className="button-editar-noticia-admin">
                        <EditarIcone />
                      </button>
                      <button
                        className="button-apagar-noticia-admin"
                        onClick={() => deletarUser(noticia.publicId)}
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
