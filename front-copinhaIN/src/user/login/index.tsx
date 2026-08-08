import { LoginIcon } from "./icones";
import { CadeadoIcon } from "./icones";
import "./login.css";

export default function Login() {
  const COP = "COP";
  const IN = "{IN}";
  const HA = "HA";

  return (
    <>
      <div className="header-login">
        <h3 className="title-header-login">
          {COP}
          <span className="span-login">{IN}</span>
          {HA}
        </h3>
      </div>
      <div className="all-content-login">
        <div className="body-login">
          <div className="upper-content-login">
            <LoginIcon />
          </div>
          <h1 className="title-login">Acesso restrito</h1>
          <p className="subtitle-login">Painel administrativo · Cop{IN}ha</p>
        </div>
        <div className="login-inputs">
          <div>
            <label className="label-login">E-MAIL</label>
            <br />
            <input
              className="input-login"
              type="email"
              placeholder="admin@copinha.com"
            ></input>
          </div>
          <div>
            <label className="label-login">SENHA</label>
            <br />
            <input
              className="input-login"
              type="password"
              placeholder="*********"
            ></input>
          </div>
          <div>
            <button className="button-login">
              <CadeadoIcon />
              <p>Entrar no painel</p>
            </button>
          </div>
        </div>
        <div>
          <p className="exclusive-login">
            Acesso exclusivo para administradores
          </p>
        </div>
      </div>
    </>
  );
}
