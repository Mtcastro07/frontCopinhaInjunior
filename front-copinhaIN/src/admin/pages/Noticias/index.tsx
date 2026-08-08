import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/header/header";
import "./noticias.css";
import { EditarIcone } from "./icones";
import { ApagarIcone } from "./icones";
import type { Noticia } from "../Dashboard";
import axios from "axios";
import FecharModalIcone from "../Jogos/icones";

export default function NoticiasGerenciar() {
  const [mostrarEdicaolNoticias, setMostrarEdicaoNoticias] =
    useState<boolean>(false);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [arquivoCriar, setArquivoCriar] = useState<File | null>(null);
  const [arquivoEditar, setArquivoEditar] = useState<File | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [editandoNoticia, setEditandoNoticia] = useState<Noticia | null>(null);
  const [mostrarCrirNoticia, setMostrarCriarNoticia] = useState<boolean>(false);
  const [dadosFormEdit, setDadosFormEdit] = useState<Noticia>({
    id: "",
    titulo: "",
    textoAbertura: "",
    textoCorpo: "",
    urlImagemCapa: "",
    tempoLeitura: 0,
    autor: "",
    grupo: "",
    criadoEm: "",
    atualizadoEm: "",
  });

  const [dadosFormCriar, setDadosFormCriar] = useState<Noticia>({
    id: "",
    titulo: "",
    textoAbertura: "",
    textoCorpo: "",
    urlImagemCapa: "",
    tempoLeitura: 0,
    autor: "",
    grupo: "",
    criadoEm: "",
    atualizadoEm: "",
  });

  useEffect(() => {
    if (editandoNoticia) {
      setDadosFormEdit({
        id: editandoNoticia.id,
        titulo: editandoNoticia.titulo,
        textoAbertura: editandoNoticia.textoAbertura,
        textoCorpo: editandoNoticia.textoCorpo,
        urlImagemCapa: editandoNoticia.urlImagemCapa,
        tempoLeitura: editandoNoticia.tempoLeitura,
        autor: editandoNoticia.autor,
        grupo: editandoNoticia.grupo,
        criadoEm: editandoNoticia.criadoEm,
        atualizadoEm: editandoNoticia.atualizadoEm,
      });
    }
  }, [editandoNoticia]);

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
    await axios.delete(`/admin/news/${publicId}`);
    let noticiasAtualizadas = noticias.filter(
      (noticiaDesejada) => noticiaDesejada.id != publicId,
    );
    setNoticias(noticiasAtualizadas);
  }

  async function handleUpload(arquivo: File): Promise<string> {
    const formData = new FormData();
    formData.append("urlImagemCapa", arquivo);

    const response = await axios.post("/admin/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.urlImagemCapa;
  }

  async function handleEditar() {
    let urlFoto = dadosFormEdit.urlImagemCapa;

    if (arquivoEditar) {
      urlFoto = await handleUpload(arquivoEditar);
    }

    await axios.put(`/admin/news/${editandoNoticia?.id}`, {
      ...dadosFormEdit,
      urlImagemCapa: urlFoto,
    });
    const response = await axios.get("urlNoticias");
    setNoticias(response.data);
    setEditandoNoticia(null);
    setMostrarEdicaoNoticias(!mostrarEdicaolNoticias);
  }

  async function handleCriar() {
    let urlFoto = dadosFormCriar.urlImagemCapa;

    if (arquivoCriar) {
      urlFoto = await handleUpload(arquivoCriar);
    }

    await axios.post(`/admin/news`, {
      ...dadosFormCriar,
      urlImagemCapa: urlFoto,
    });
    const response = await axios.get(`urlNoticias`);
    setNoticias(response.data);
    setMostrarCriarNoticia(!mostrarCrirNoticia);
    setArquivoCriar(null);
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
                onClick={() => setMostrarCriarNoticia(!mostrarCrirNoticia)}
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
                  <div className="noticia-admin" key={noticia.id}>
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
                      <button
                        className="button-editar-noticia-admin"
                        onClick={() => {
                          {
                            setMostrarEdicaoNoticias(!mostrarEdicaolNoticias);
                            setEditandoNoticia(noticia);
                          }
                        }}
                      >
                        <EditarIcone />
                      </button>
                      <button
                        className="button-apagar-noticia-admin"
                        onClick={() => deletarUser(noticia.id)}
                      >
                        <ApagarIcone />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {mostrarCrirNoticia && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="title-modal">
                      <h4 className="text-title-modal">Criar Notícia</h4>
                      <button
                        className="close-modal"
                        onClick={() =>
                          setMostrarCriarNoticia(!mostrarCrirNoticia)
                        }
                      >
                        <FecharModalIcone />
                      </button>
                    </div>
                    <div className="titulo-autor-noticia-modal">
                      <div>
                        <label>Titulo da notícia</label>
                        <br />
                        <input
                          type="Text"
                          className="input-modal-noticia"
                          value={dadosFormCriar.titulo}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              titulo: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Texto de abertura</label>
                        <br />
                        <input
                          type="text"
                          className="input-modal-noticia"
                          value={dadosFormCriar.textoAbertura}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              textoAbertura: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Autor da Noticia</label>
                        <br />
                        <input
                          type="text"
                          className="input-modal-noticia"
                          value={dadosFormCriar.autor}
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              autor: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="content-modal-noticia">
                      <label>Conteudo da Noticia</label>
                      <br />
                      <textarea
                        className="text-area-noticia-modal"
                        value={dadosFormCriar.textoCorpo}
                        onChange={(e) =>
                          setDadosFormCriar({
                            ...dadosFormCriar,
                            textoCorpo: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="img-tempo-noticia-modal">
                      <div>
                        <label>Coloque a imagem da sua noticia aqui:</label>
                        <input
                          className="input-img-noticia"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setArquivoCriar(e.target.files?.[0] ?? null)
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Tempo de leitura da noticia, em minutos:</label>
                        <input
                          type="number"
                          value={dadosFormCriar.tempoLeitura}
                          className="tempo-input-noticia"
                          onChange={(e) =>
                            setDadosFormCriar({
                              ...dadosFormCriar,
                              tempoLeitura: Number(e.target.value),
                            })
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="modal-enviar"></div>
                    <button
                      className="enviar-modal"
                      onClick={() => handleCriar()}
                    >
                      Criar
                    </button>
                  </div>
                </div>
              )}
              {mostrarEdicaolNoticias && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="title-modal">
                      <h4 className="text-title-modal">Editar Notícia</h4>
                      <button
                        className="close-modal"
                        onClick={() =>
                          setMostrarEdicaoNoticias(!mostrarEdicaolNoticias)
                        }
                      >
                        <FecharModalIcone />
                      </button>
                    </div>
                    <div className="titulo-autor-noticia-modal">
                      <div>
                        <label>Titulo da notícia</label>
                        <br />
                        <input
                          type="Text"
                          value={dadosFormEdit.titulo}
                          className="input-modal-noticia"
                          onChange={(e) =>
                            setDadosFormEdit({
                              ...dadosFormEdit,
                              titulo: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <label>Texto de abertura</label>
                      <br />
                      <input
                        value={dadosFormEdit.textoAbertura}
                        type="text"
                        className="input-modal-noticia"
                        onChange={(e) =>
                          setDadosFormEdit({
                            ...dadosFormEdit,
                            textoAbertura: e.target.value,
                          })
                        }
                      ></input>
                      <div>
                        <label>Autor da Noticia</label>
                        <br />
                        <input
                          value={dadosFormEdit.autor}
                          type="text"
                          className="input-modal-noticia"
                          onChange={(e) =>
                            setDadosFormEdit({
                              ...dadosFormEdit,
                              autor: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="content-modal-noticia">
                      <label>Conteudo da Noticia</label>
                      <br />
                      <textarea
                        value={dadosFormEdit.textoCorpo}
                        className="text-area-noticia-modal"
                        onChange={(e) =>
                          setDadosFormEdit({
                            ...dadosFormEdit,
                            textoCorpo: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="img-tempo-noticia-modal">
                      <div>
                        <label>Coloque a imagem da sua noticia aqui:</label>
                        <input
                          className="input-img-noticia"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setArquivoEditar(e.target.files?.[0] ?? null)
                          }
                        ></input>
                      </div>
                      <div>
                        <label>Tempo de leitura da noticia, em minutos:</label>
                        <input
                          type="number"
                          value={dadosFormEdit.tempoLeitura}
                          className="tempo-input-noticia"
                          onChange={(e) =>
                            setDadosFormEdit({
                              ...dadosFormEdit,
                              tempoLeitura: Number(e.target.value),
                            })
                          }
                        ></input>
                      </div>
                    </div>
                    <div className="modal-enviar"></div>
                    <button
                      className="enviar-modal"
                      onClick={() => handleEditar()}
                    >
                      Editar
                    </button>
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
