import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNoticia, type Noticia } from "../../../services/newsService";
import { getUltimoResultado, type Jogo } from "../../../services/matchService";

function Homepage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [ultimoResultado, setUltimoResultado] = useState<Jogo | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [dadosNoticias, dadosResultado] = await Promise.all([
          getNoticia(),
          getUltimoResultado(),
        ]);
        setNoticias(dadosNoticias);
        setUltimoResultado(dadosResultado);
      } catch (e) {
        console.error("Erro ao carregar homepage:", e);
        setErro("Não foi possível carregar os dados. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  if (carregando) return <p className="carregando">Carregando...</p>;
  if (erro) return <p className="erro">{erro}</p>;

  return (
    <main className="homepage">
      <section className="ultimo-resultado">
        <h2>Último resultado</h2>
        {ultimoResultado ? (
          <div className="resultado-card">
            <span>{ultimoResultado.timeMandante}</span>
            <strong>
              {ultimoResultado.placarMandante} x {ultimoResultado.placarVisitante}
            </strong>
            <span>{ultimoResultado.timeVisitante}</span>
          </div>
        ) : (
          <p>Nenhum resultado disponível ainda.</p>
        )}
      </section>

      <section className="lista-noticias">
        <h2>Últimas notícias</h2>
        <div className="grid-noticias">
          {noticias.map((noticia) => (
            <Link key={noticia.id} to={`/noticias/${noticia.id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <h3>{noticia.titulo}</h3>
              <p>{noticia.subtitulo}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Homepage;
