import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNoticia, type Noticia } from "../../../services/newsService";
import { getUltimoResultado, type Jogo } from "../../../services/matchService";
import styles from './styles.module.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer'

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
    <main className={styles.homepage}>
      <Header/>
      <div className={styles.title}>
        <div>
          <h1>COP<span>{'{IN}'}</span>HA</h1>
          <p>Notícias, placar e tabela da Copa do Mundo em um só lugar!</p>
        </div>
        <div className={styles.last_result}>
          <h2>Último resultado</h2>
          {ultimoResultado ? (
            <div className={styles.result_card}>
              <div>
                {ultimoResultado.timeMandante}
              </div>
              <div>
                <strong>
                  <span>{ultimoResultado.placarMandante} x {ultimoResultado.placarVisitante}</span>
                </strong>
              </div>
              <div>
                {ultimoResultado.timeVisitante}
              </div>
            </div>
          ) : (
            <p>Nenhum resultado disponível ainda.</p>
          )}
        </div>
      </div>

      <section className={styles.lista_noticias}>
        <div className={styles.last_news}>
          <h2>Últimas notícias</h2>
        </div>
        <div className={styles.grid_noticias}>
          {noticias.map((noticia) => (
            <Link key={noticia.id} to={`/noticias/${noticia.id}`} className={styles.card_noticia}>
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
