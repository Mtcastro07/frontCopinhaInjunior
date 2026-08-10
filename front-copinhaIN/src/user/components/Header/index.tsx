import logoImage from "../../../assets/logo1.png";
import "./header.css";
import { NavLink } from "react-router-dom";

import { useState } from "react";

export default function Header() {
  const [aberto, setAberto] = useState("Noticias");

  return (
    <div className="header-container-user-page">
      <div className="logo-title-user-page">
        <img src={logoImage} />
        <h3>
          COP<span>{"{IN}"}</span>HA
        </h3>
      </div>
      <div>
        <nav className="links-user-page">
          <NavLink
            to="/"
            className="link-user-page"
            onClick={() => setAberto("Noticias")}
          >
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "header-link-user-page-aberto"
                    : "header-link-user-page-fechado"
                }
              >
                {isActive ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_642_393)">
                      <path
                        d="M10.0001 12H6.66675"
                        stroke="white"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.0001 9.33333H6.66675"
                        stroke="white"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.66659 14.6667H13.3333C13.6869 14.6667 14.026 14.5262 14.2761 14.2761C14.5261 14.0261 14.6666 13.687 14.6666 13.3333V2.66667C14.6666 2.31304 14.5261 1.97391 14.2761 1.72386C14.026 1.47381 13.6869 1.33333 13.3333 1.33333H5.33325C4.97963 1.33333 4.64049 1.47381 4.39044 1.72386C4.14039 1.97391 3.99992 2.31304 3.99992 2.66667V13.3333C3.99992 13.687 3.85944 14.0261 3.60939 14.2761C3.35935 14.5262 3.02021 14.6667 2.66659 14.6667ZM2.66659 14.6667C2.31296 14.6667 1.97382 14.5262 1.72378 14.2761C1.47373 14.0261 1.33325 13.687 1.33325 13.3333V7.33333C1.33325 6.97971 1.47373 6.64057 1.72378 6.39052C1.97382 6.14048 2.31296 6 2.66659 6H3.99992"
                        stroke="white"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.3334 4H7.33341C6.96522 4 6.66675 4.29848 6.66675 4.66667V6C6.66675 6.36819 6.96522 6.66667 7.33341 6.66667H11.3334C11.7016 6.66667 12.0001 6.36819 12.0001 6V4.66667C12.0001 4.29848 11.7016 4 11.3334 4Z"
                        stroke="white"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_642_393">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_642_393)">
                      <path
                        d="M10.0001 12H6.66675"
                        stroke="#8BA3BC"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.0001 9.33333H6.66675"
                        stroke="#8BA3BC"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.66659 14.6667H13.3333C13.6869 14.6667 14.026 14.5262 14.2761 14.2761C14.5261 14.0261 14.6666 13.687 14.6666 13.3333V2.66667C14.6666 2.31304 14.5261 1.97391 14.2761 1.72386C14.026 1.47381 13.6869 1.33333 13.3333 1.33333H5.33325C4.97963 1.33333 4.64049 1.47381 4.39044 1.72386C4.14039 1.97391 3.99992 2.31304 3.99992 2.66667V13.3333C3.99992 13.687 3.85944 14.0261 3.60939 14.2761C3.35935 14.5262 3.02021 14.6667 2.66659 14.6667ZM2.66659 14.6667C2.31296 14.6667 1.97382 14.5262 1.72378 14.2761C1.47373 14.0261 1.33325 13.687 1.33325 13.3333V7.33333C1.33325 6.97971 1.47373 6.64057 1.72378 6.39052C1.97382 6.14048 2.31296 6 2.66659 6H3.99992"
                        stroke="#8BA3BC"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.3334 4H7.33341C6.96522 4 6.66675 4.29848 6.66675 4.66667V6C6.66675 6.36819 6.96522 6.66667 7.33341 6.66667H11.3334C11.7016 6.66667 12.0001 6.36819 12.0001 6V4.66667C12.0001 4.29848 11.7016 4 11.3334 4Z"
                        stroke="#8BA3BC"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_642_393">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
                <p className="header-text-user-page">Noticias</p>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/Grupos"
            className="link-user-page"
            onClick={() => setAberto("Grupos")}
          >
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "header-link-user-page-aberto"
                    : "header-link-user-page-fechado"
                }
              >
                {isActive ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6666 4.66667L8.99992 10.3333L5.66659 7L1.33325 11.3333"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6667 4.66667H14.6667V8.66667"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6666 4.66667L8.99992 10.3333L5.66659 7L1.33325 11.3333"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6667 4.66667H14.6667V8.66667"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
                <p className="header-text-user-page">Grupos</p>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/Jogos"
            className="link-user-page"
            onClick={() => setAberto("Jogos")}
          >
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "header-link-user-page-aberto"
                    : "header-link-user-page-fechado"
                }
              >
                {isActive ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33325 1.33333V4"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6667 1.33333V4"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 6.66667H14"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33325 1.33333V4"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6667 1.33333V4"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 6.66667H14"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
                <p className="header-text-user-page">Jogos</p>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/Simulador"
            className="link-user-page"
            onClick={() => setAberto("Simulador")}
          >
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "header-link-user-page-aberto"
                    : "header-link-user-page-fechado"
                }
              >
                {isActive ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.66674 9.33333C2.54059 9.33376 2.4169 9.29839 2.31005 9.23132C2.20319 9.16425 2.11757 9.06824 2.06311 8.95444C2.00865 8.84064 1.9876 8.71372 2.00241 8.58844C2.01721 8.46315 2.06726 8.34464 2.14674 8.24667L8.74674 1.44667C8.79625 1.38952 8.86372 1.3509 8.93806 1.33715C9.01241 1.32341 9.08923 1.33534 9.1559 1.371C9.22257 1.40666 9.27513 1.46393 9.30497 1.53341C9.3348 1.60288 9.34013 1.68043 9.32008 1.75333L8.04008 5.76667C8.00233 5.86768 7.98966 5.97635 8.00314 6.08334C8.01662 6.19033 8.05585 6.29245 8.11747 6.38095C8.17909 6.46945 8.26126 6.54168 8.35693 6.59144C8.45259 6.6412 8.55891 6.66702 8.66674 6.66667H13.3334C13.4596 6.66624 13.5833 6.70161 13.6901 6.76868C13.797 6.83575 13.8826 6.93176 13.937 7.04556C13.9915 7.15936 14.0125 7.28628 13.9977 7.41156C13.9829 7.53685 13.9329 7.65536 13.8534 7.75333L7.25341 14.5533C7.2039 14.6105 7.13644 14.6491 7.06209 14.6628C6.98774 14.6766 6.91093 14.6647 6.84426 14.629C6.77759 14.5933 6.72502 14.5361 6.69519 14.4666C6.66535 14.3971 6.66002 14.3196 6.68008 14.2467L7.96008 10.2333C7.99782 10.1323 8.0105 10.0237 7.99702 9.91666C7.98354 9.80967 7.9443 9.70755 7.88268 9.61905C7.82106 9.53055 7.73889 9.45832 7.64323 9.40856C7.54756 9.3588 7.44125 9.33298 7.33341 9.33333H2.66674Z"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.66674 9.33333C2.54059 9.33376 2.4169 9.29839 2.31005 9.23132C2.20319 9.16425 2.11757 9.06824 2.06311 8.95444C2.00865 8.84064 1.9876 8.71372 2.00241 8.58844C2.01721 8.46315 2.06726 8.34464 2.14674 8.24667L8.74674 1.44667C8.79625 1.38952 8.86372 1.3509 8.93806 1.33715C9.01241 1.32341 9.08923 1.33534 9.1559 1.371C9.22257 1.40666 9.27513 1.46393 9.30497 1.53341C9.3348 1.60288 9.34013 1.68043 9.32008 1.75333L8.04008 5.76667C8.00233 5.86768 7.98966 5.97635 8.00314 6.08334C8.01662 6.19033 8.05585 6.29245 8.11747 6.38095C8.17909 6.46945 8.26126 6.54168 8.35693 6.59144C8.45259 6.6412 8.55891 6.66702 8.66674 6.66667H13.3334C13.4596 6.66624 13.5833 6.70161 13.6901 6.76868C13.797 6.83575 13.8826 6.93176 13.937 7.04556C13.9915 7.15936 14.0125 7.28628 13.9977 7.41156C13.9829 7.53685 13.9329 7.65536 13.8534 7.75333L7.25341 14.5533C7.2039 14.6105 7.13644 14.6491 7.06209 14.6628C6.98774 14.6766 6.91093 14.6647 6.84426 14.629C6.77759 14.5933 6.72502 14.5361 6.69519 14.4666C6.66535 14.3971 6.66002 14.3196 6.68008 14.2467L7.96008 10.2333C7.99782 10.1323 8.0105 10.0237 7.99702 9.91666C7.98354 9.80967 7.9443 9.70755 7.88268 9.61905C7.82106 9.53055 7.73889 9.45832 7.64323 9.40856C7.54756 9.3588 7.44125 9.33298 7.33341 9.33333H2.66674Z"
                      stroke="#8BA3BC"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
                <p className="header-text-user-page">Simulador</p>
              </div>
            )}
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
