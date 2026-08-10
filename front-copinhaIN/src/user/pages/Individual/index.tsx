import { api } from "../../../services/api";
import { useState, useEffect } from "react";
import type { Noticia } from "../../../admin/pages/Dashboard";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { IconeAutor } from "./icones";
import Footer from "../../../components/footer/footer";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import "./individual.css";
import { IconeTempo } from "./icones";
import { useNavigate } from "react-router-dom";

export default function individualPage() {
  const [noticia, setNoticia] = useState<Noticia>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    async function carregarNoticias() {
      const response = await api.get("/noticias");
      return setNoticias(response.data);
    }
    carregarNoticias();
  }, []);

  useEffect(() => {
    async function carregarNoticia() {
      const response = await api.get(`noticia/${id}`);
      return setNoticia(response.data);
    }
    carregarNoticia();
  }, [noticia]);

  return (
    <>
      <Header />
      <main className="individual-noticia-content">
        <div className="text-individual-content" key={noticia?.id}>
          <div className="grupo-tempo-individual-noticia">
            <p className="grupo-individual-noticia">Grupo {noticia?.grupo}</p>
            <div className="tempo-individual-noticia">
              <IconeTempo />
              <p className="paragrafo-tempo-individual-page">
                {noticia?.tempoLeitura} min de leitura
              </p>
            </div>
          </div>
          <h1 className="titulo-individual-noticia">{noticia?.titulo}</h1>
          <p className="subtitulo-individual-noticia">
            {noticia?.textoAbertura}
          </p>
          <div className="autor-individual-noticia">
            <IconeAutor />
            <div className="dados-autor-individual-noticia">
              <p className="nome-autor-individual-noticia">{noticia?.autor}</p>
              <p className="data-individual-noticia">{noticia?.criadoEm}</p>
            </div>
          </div>

          <img
            src={noticia?.urlImagemCapa}
            alt="imagem-noticia"
            className="imagem-principal-noticia-individual"
          ></img>

          <p className="descricao-noticia-individual">{noticia?.textoCorpo}</p>
        </div>

        <div className="carrossel-individual-page">
          <div className="titulo-linha-carrossel-individual-page">
            <h3 className="titulo-carrossel-individual-page">MAIS NOTÍCIAS</h3>
            <p className="linha-carrossel-individual-page">a</p>
          </div>

          {/* @ts-ignore */}
          <ScrollContainer className="carrossel-container-individual-page">
            {noticias.map((noticia) => (
              <div
                className="carrossel-content-individual-page"
                key={noticia.id}
                onClick={() => navigate(`/noticias/${noticia.id}`)}
              >
                <img
                  src={noticia.urlImagemCapa}
                  alt="img-noticia"
                  className="carrossel-image-individual-page"
                ></img>
                <div className="text-carrossel-individual-page">
                  <p className="grupo-carrossel-individual-page">
                    Grupo {noticia.grupo}
                  </p>
                  <h6 className="titulo-carrossel-individual-page">
                    {noticia.titulo}
                  </h6>
                </div>
              </div>
            ))}
          </ScrollContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
