//import logoImage from '../../../assets/logo1.png'
import styles from "./styles.module.css";
//import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.esq}>
        <h3>
          COP<span>{"{IN}"}</span>HA © 2026
        </h3>
      </div>
      <div>
        <p>Copa do Mundo</p>
        <p>Fase de Grupos</p>
        <link href="/admin">Área Administrativa</link>
      </div>
    </div>
  );
}
