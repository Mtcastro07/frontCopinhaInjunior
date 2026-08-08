import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";
import useContagem from "../../hooks/useContagem";
import logo from "../../../../public/logoCopinha.png";
import { useLogout } from "../../../hooks/useLogout";

export type setState = (valor: number) => void;

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selecionado, setSelecionado] = useState<string>(
    location.pathname === "/grupos" ? "grupos" : "dashboard",
  );
  const [dados, setDados] = useState({
    name: "Nome do usuario",
    email: "email do usuario",
  });
  const [qntdNoticias, setQntdNoticas] = useState<number>(0);
  const [qntdGrupos, setQntdGrupos] = useState<number>(0);
  const [qntdTimes, setQntdTimes] = useState<number>(0);
  const [qntdJogos, setQntdJogos] = useState<number>(0);
  const [qntdEstadios, setQntdEstadios] = useState<number>(0);

  useContagem(setQntdNoticas, "urlNoticias");
  useContagem(setQntdGrupos, "urlGrupos");
  useContagem(setQntdEstadios, "urlEstadios");
  useContagem(setQntdJogos, "urlJogo");
  useContagem(setQntdTimes, "urlTimes");

  useEffect(() => {
    async function carregarUsuario() {
      const response = await axios.get("urlUsuario");
      setDados(response.data);
    }
    carregarUsuario();
  }, []);

  const IN = "{IN}";
  const COP = "COP";
  const HA = "HA";
  const noticiasCount = qntdNoticias;
  const gruposCount = qntdGrupos;
  const timesCount = qntdTimes;
  const jogosCount = qntdJogos;
  const estadioCount = qntdEstadios;
  const nome = dados.name;
  const email = dados.email;

  return (
    <>
      <div className="header-container-admin">
        <div className="header-userInfos-admin">
          <div className="top-header-admin">
            <div className="icon-title-admin">
              <img className="logo-image-header" src={logo}></img>

              <div className="title-subtitle-admin">
                <h4 className="title-admin">
                  {COP}
                  {<span className="IN-admin">{IN}</span>}
                  {HA}
                </h4>
                <p className="subtitle-admin">Painel Admin</p>
              </div>
            </div>
            <div className="admin-user-infos">
              <p className="username-admin">{nome}</p>
              <p className="useremail-admin">{email}</p>
            </div>
          </div>
          <p className="divisoria-header-admin">a</p>
          <div className="buttons-admin">
            <div className="list-buttons-admin">
              <Link to="/Dashboard">
                <button
                  className={selecionado == "dashboard" ? "aberto" : "fechado"}
                  onClick={() => {
                    setSelecionado("dashboard");
                    navigate("/");
                  }}
                >
                  <div className="icon-nameButton-admin">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_145_677)">
                        <path
                          d="M5 1H1.66667C1.29848 1 1 1.29848 1 1.66667V6.33333C1 6.70152 1.29848 7 1.66667 7H5C5.36819 7 5.66667 6.70152 5.66667 6.33333V1.66667C5.66667 1.29848 5.36819 1 5 1Z"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.333 7H8.99967C8.63148 7 8.33301 7.29848 8.33301 7.66667V12.3333C8.33301 12.7015 8.63148 13 8.99967 13H12.333C12.7012 13 12.9997 12.7015 12.9997 12.3333V7.66667C12.9997 7.29848 12.7012 7 12.333 7Z"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 9.66667H1.66667C1.29848 9.66667 1 9.96515 1 10.3333V12.3333C1 12.7015 1.29848 13 1.66667 13H5C5.36819 13 5.66667 12.7015 5.66667 12.3333V10.3333C5.66667 9.96515 5.36819 9.66667 5 9.66667Z"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_145_677">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Dashboard</p>
                  </div>
                </button>
              </Link>
              <Link to="/NoticiasAdmin">
                <button
                  onClick={() => setSelecionado("noticias")}
                  className={selecionado == "noticias" ? "aberto" : "fechado"}
                >
                  <div className="icon-nameButton-admin">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_145_684)">
                        <path
                          d="M9.99984 12H6.6665"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9998 9.33333H6.6665"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.66683 14.6667H13.3335C13.6871 14.6667 14.0263 14.5262 14.2763 14.2761C14.5264 14.0261 14.6668 13.687 14.6668 13.3333V2.66666C14.6668 2.31304 14.5264 1.9739 14.2763 1.72385C14.0263 1.4738 13.6871 1.33333 13.3335 1.33333H5.3335C4.97987 1.33333 4.64074 1.4738 4.39069 1.72385C4.14064 1.9739 4.00016 2.31304 4.00016 2.66666V13.3333C4.00016 13.687 3.85969 14.0261 3.60964 14.2761C3.35959 14.5262 3.02045 14.6667 2.66683 14.6667ZM2.66683 14.6667C2.31321 14.6667 1.97407 14.5262 1.72402 14.2761C1.47397 14.0261 1.3335 13.687 1.3335 13.3333V7.33333C1.3335 6.97971 1.47397 6.64057 1.72402 6.39052C1.97407 6.14047 2.31321 6 2.66683 6H4.00016"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.3332 4H7.33317C6.96498 4 6.6665 4.29848 6.6665 4.66667V6C6.6665 6.36819 6.96498 6.66667 7.33317 6.66667H11.3332C11.7014 6.66667 11.9998 6.36819 11.9998 6V4.66667C11.9998 4.29848 11.7014 4 11.3332 4Z"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_145_684">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Notícias</p>
                  </div>
                  <p>{noticiasCount}</p>
                </button>
              </Link>
              <Link to="/GruposAdmin">
                <button
                  onClick={() => {
                    setSelecionado("grupos");
                    navigate("/grupos");
                  }}
                  className={selecionado == "grupos" ? "aberto" : "fechado"}
                >
                  <div className="icon-nameButton-admin">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_145_693)">
                        <path
                          d="M8.55315 1.45334C8.37944 1.3741 8.19074 1.3331 7.99981 1.3331C7.80889 1.3331 7.62019 1.3741 7.44648 1.45334L1.73315 4.05334C1.61485 4.1055 1.51427 4.19094 1.44366 4.29924C1.37304 4.40755 1.33545 4.53405 1.33545 4.66334C1.33545 4.79263 1.37304 4.91913 1.44366 5.02743C1.51427 5.13574 1.61485 5.22117 1.73315 5.27334L7.45315 7.88C7.62686 7.95924 7.81555 8.00024 8.00648 8.00024C8.19741 8.00024 8.38611 7.95924 8.55981 7.88L14.2798 5.28C14.3981 5.22784 14.4987 5.14241 14.5693 5.0341C14.6399 4.92579 14.6775 4.79929 14.6775 4.67C14.6775 4.54071 14.6399 4.41421 14.5693 4.30591C14.4987 4.1976 14.3981 4.11217 14.2798 4.06L8.55315 1.45334Z"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.3335 8C1.33318 8.12751 1.36944 8.25244 1.43798 8.35997C1.50651 8.46749 1.60444 8.55311 1.72016 8.60667L7.4535 11.2133C7.6263 11.2916 7.81381 11.3321 8.0035 11.3321C8.19319 11.3321 8.3807 11.2916 8.5535 11.2133L14.2735 8.61333C14.3915 8.56029 14.4915 8.47406 14.5614 8.36516C14.6312 8.25625 14.6679 8.12937 14.6668 8"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.3335 11.3333C1.33318 11.4609 1.36944 11.5858 1.43798 11.6933C1.50651 11.8008 1.60444 11.8865 1.72016 11.94L7.4535 14.5467C7.6263 14.6249 7.81381 14.6654 8.0035 14.6654C8.19319 14.6654 8.3807 14.6249 8.5535 14.5467L14.2735 11.9467C14.3915 11.8936 14.4915 11.8074 14.5614 11.6985C14.6312 11.5896 14.6679 11.4627 14.6668 11.3333"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_145_693">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Grupos</p>
                  </div>
                  <p>{gruposCount}</p>
                </button>
              </Link>
              <Link to="/TimesAdmin">
                <button
                  onClick={() => setSelecionado("times")}
                  className={selecionado == "times" ? "aberto" : "fechado"}
                >
                  <div className="icon-nameButton-admin">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3332 8.66667C13.3332 12 10.9998 13.6667 8.2265 14.6333C8.08128 14.6826 7.92353 14.6802 7.77984 14.6267C4.99984 13.6667 2.6665 12 2.6665 8.66667V4C2.6665 3.82319 2.73674 3.65362 2.86177 3.5286C2.98679 3.40358 3.15636 3.33334 3.33317 3.33334C4.6665 3.33334 6.33317 2.53334 7.49317 1.52C7.63441 1.39934 7.81407 1.33304 7.99984 1.33304C8.1856 1.33304 8.36527 1.39934 8.5065 1.52C9.67317 2.54 11.3332 3.33334 12.6665 3.33334C12.8433 3.33334 13.0129 3.40358 13.1379 3.5286C13.2629 3.65362 13.3332 3.82319 13.3332 4V8.66667Z"
                        stroke="white"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Times</p>
                  </div>
                  <p>{timesCount}</p>
                </button>
              </Link>
              <Link to="/JogosAdmin">
                <button
                  onClick={() => setSelecionado("jogos")}
                  className={selecionado == "jogos" ? "aberto" : "fechado"}
                >
                  <div className="icon-nameButton-admin">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3332 0.666656H1.99984C1.26346 0.666656 0.666504 1.26361 0.666504 1.99999V11.3333C0.666504 12.0697 1.26346 12.6667 1.99984 12.6667H11.3332C12.0696 12.6667 12.6665 12.0697 12.6665 11.3333V1.99999C12.6665 1.26361 12.0696 0.666656 11.3332 0.666656Z"
                        stroke="white"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Jogos</p>
                  </div>
                  <p>{jogosCount}</p>
                </button>
              </Link>
              <Link to="/EstadiosAdmin">
                <button
                  onClick={() => setSelecionado("estadios")}
                  className={selecionado == "estadios" ? "aberto" : "fechado"}
                >
                  <div className="icon-nameButton-admin">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_145_716)">
                        <path
                          d="M4 14.6667V2.66668C4 2.31305 4.14048 1.97392 4.39052 1.72387C4.64057 1.47382 4.97971 1.33334 5.33333 1.33334H10.6667C11.0203 1.33334 11.3594 1.47382 11.6095 1.72387C11.8595 1.97392 12 2.31305 12 2.66668V14.6667H4Z"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.00016 8H2.66683C2.31321 8 1.97407 8.14048 1.72402 8.39052C1.47397 8.64057 1.3335 8.97971 1.3335 9.33333V13.3333C1.3335 13.687 1.47397 14.0261 1.72402 14.2761C1.97407 14.5262 2.31321 14.6667 2.66683 14.6667H4.00016"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 6H13.3333C13.687 6 14.0261 6.14048 14.2761 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H12"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.6665 4H9.33317"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.6665 6.66666H9.33317"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.6665 9.33334H9.33317"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.6665 12H9.33317"
                          stroke="white"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_145_716">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Estádios</p>
                  </div>
                  <p>{estadioCount}</p>
                </button>
              </Link>
            </div>
          </div>
          <p className="sair-divisoria-header-admin">a</p>
          <div className="footer-admin">
            <div className="icon-text-sair-admin">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6"
                  stroke="#E85555"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6665 11.3333L13.9998 7.99996L10.6665 4.66663"
                  stroke="#E85555"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 8H6"
                  stroke="#E85555"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p onClick={() => useLogout()}>Sair da conta</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
