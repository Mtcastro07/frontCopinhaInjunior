import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-brand">
          COP<span className="footer-brand-highlight">{"{IN}"}</span>HA{" "}
          <span className="footer-copy">© 2026</span>
        </p>

        <p className="footer-links">Copa do Mundo · Fase de Grupos</p>
      </div>
    </footer>
  );
}
