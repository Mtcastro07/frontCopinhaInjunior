import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <svg
            className="navbar-brand-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14" cy="14" r="12" stroke="white" strokeWidth="1.5" />
            <path
              d="M14 2v24M2 14h24M4.8 7.2l18.4 13.6M23.2 7.2 4.8 20.8"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <span className="navbar-brand-text">
            COP<span className="navbar-brand-highlight">{"{IN}"}</span>HA
          </span>
        </NavLink>

        <nav className="navbar-nav">
          <span className="navbar-link navbar-link-disabled">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 12H6.6665M11.9998 9.33333H6.6665M2.66683 14.6667H13.3335C13.6871 14.6667 14.0263 14.5262 14.2763 14.2761C14.5264 14.0261 14.6668 13.687 14.6668 13.3333V2.66666C14.6668 2.31304 14.5264 1.9739 14.2763 1.72385C14.0263 1.4738 13.6871 1.33333 13.3335 1.33333H5.3335C4.97987 1.33333 4.64074 1.4738 4.39069 1.72385C4.14064 1.9739 4.00016 2.31304 4.00016 2.66666V13.3333C4.00016 13.687 3.85969 14.0261 3.60964 14.2761C3.35959 14.5262 3.02045 14.6667 2.66683 14.6667ZM2.66683 14.6667C2.31321 14.6667 1.97407 14.5262 1.72402 14.2761C1.47397 14.0261 1.3335 13.687 1.3335 13.3333V7.33333C1.3335 6.97971 1.47397 6.64057 1.72402 6.39052C1.97407 6.14047 2.31321 6 2.66683 6H4.00016"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Notícias
          </span>

          <NavLink
            to="/grupos"
            className={({ isActive }) =>
              isActive ? "navbar-link navbar-link-active" : "navbar-link"
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.55315 1.45334C8.37944 1.3741 8.19074 1.3331 7.99981 1.3331C7.80889 1.3331 7.62019 1.3741 7.44648 1.45334L1.73315 4.05334C1.61485 4.1055 1.51427 4.19094 1.44366 4.29924C1.37304 4.40755 1.33545 4.53405 1.33545 4.66334C1.33545 4.79263 1.37304 4.91913 1.44366 5.02743C1.51427 5.13574 1.61485 5.22117 1.73315 5.27334L7.45315 7.88C7.62686 7.95924 7.81555 8.00024 8.00648 8.00024C8.19741 8.00024 8.38611 7.95924 8.55981 7.88L14.2798 5.28C14.3981 5.22784 14.4987 5.14241 14.5693 5.0341C14.6399 4.92579 14.6775 4.79929 14.6775 4.67C14.6775 4.54071 14.6399 4.41421 14.5693 4.30591C14.4987 4.1976 14.3981 4.11217 14.2798 4.06L8.55315 1.45334Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.3335 8C1.33318 8.12751 1.36944 8.25244 1.43798 8.35997C1.50651 8.46749 1.60444 8.55311 1.72016 8.60667L7.4535 11.2133C7.6263 11.2916 7.81381 11.3321 8.0035 11.3321C8.19319 11.3321 8.3807 11.2916 8.5535 11.2133L14.2735 8.61333C14.3915 8.56029 14.4915 8.47406 14.5614 8.36516C14.6312 8.25625 14.6679 8.12937 14.6668 8"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.3335 11.3333C1.33318 11.4609 1.36944 11.5858 1.43798 11.6933C1.50651 11.8008 1.60444 11.8865 1.72016 11.94L7.4535 14.5467C7.6263 14.6249 7.81381 14.6654 8.0035 14.6654C8.19319 14.6654 8.3807 14.6249 8.5535 14.5467L14.2735 11.9467C14.3915 11.8936 14.4915 11.8074 14.5614 11.6985C14.6312 11.5896 14.6679 11.4627 14.6668 11.3333"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Grupos
          </NavLink>

          <span className="navbar-link navbar-link-disabled">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3332 0.666656H1.99984C1.26346 0.666656 0.666504 1.26361 0.666504 1.99999V11.3333C0.666504 12.0697 1.26346 12.6667 1.99984 12.6667H11.3332C12.0696 12.6667 12.6665 12.0697 12.6665 11.3333V1.99999C12.6665 1.26361 12.0696 0.666656 11.3332 0.666656Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Jogos
          </span>

          <span className="navbar-link navbar-link-disabled">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.66683 1.16666L1.75016 8.24999H7.00016L6.3335 12.8333L12.2502 5.74999H7.00016L7.66683 1.16666Z"
                stroke="currentColor"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Simulador
          </span>
        </nav>
      </div>
    </header>
  );
}
