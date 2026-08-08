import { LoginIcon } from "./icones";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { loginSchema } from "../../schemas/loginSchema";
import { CadeadoIcon } from "./icones";
import "./login.css";

export default function Login() {
  const COP = "COP";
  const IN = "{IN}";
  const HA = "HA";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroValidacao, setErroValidacao] = useState("");

  const { mutate, isError, isPending } = useLogin();

  function handleSubmit() {
    const resultado = loginSchema.safeParse({ email, password });

    if (!resultado.success) {
      setErroValidacao(resultado.error.issues[0].message);
      return;
    }

    setErroValidacao("");
    mutate(resultado.data);
  }

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@copinha.com"
            ></input>
          </div>
          <div>
            <label className="label-login">SENHA</label>
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-login"
              type="password"
              placeholder="*********"
            ></input>
          </div>
          <div>
            {erroValidacao && <p style={{ color: "red" }}>{erroValidacao}</p>}
            {isError && (
              <p style={{ color: "red" }}>E-mail ou senha incorretos</p>
            )}
            <button className="button-login" onClick={handleSubmit}>
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
