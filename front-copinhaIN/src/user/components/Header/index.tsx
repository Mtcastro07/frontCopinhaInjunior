import logoImage from '../../../assets/logo1.png'
import styles from './styles.module.css'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.esq}>
                <img src={logoImage}/>
                <h3>COP<span>{'{IN}'}</span>HA</h3>
            </div>
            <div>
                <nav>
                    <NavLink>Notícias</NavLink>
                    <NavLink>Grupos</NavLink>
                    <NavLink>Jogos</NavLink>
                    <NavLink>Simulador</NavLink>
                </nav>
            </div>
        </div>
    )
}