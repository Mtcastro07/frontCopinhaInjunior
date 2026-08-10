import "./footer.css";
import { Link } from "react-router-dom";
import LockIcon from "./icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-brand">
          COP<span className="footer-brand-highlight">{"{IN}"}</span>HA{" "}
          <span className="footer-copy">© 2026</span>
        </p>

        <div className="footer-links">
          <p>Copa do Mundo · Fase de Grupos </p>
          <Link to={"/login"} className="admin-footer">
            <LockIcon />

            <p>Área administrativa</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
