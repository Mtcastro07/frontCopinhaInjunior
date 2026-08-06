import { useState } from "react";

export function LixoIcon() {
  const [deleteTeam, setDeleteTeam] = useState(false);

  return (
    <>
      <svg
        onClick={() => setDeleteTeam(!deleteTeam)}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.75 3.5H12.25"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.0832 3.5V11.6667C11.0832 12.25 10.4998 12.8333 9.9165 12.8333H4.08317C3.49984 12.8333 2.9165 12.25 2.9165 11.6667V3.5"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.6665 3.50001V2.33334C4.6665 1.75001 5.24984 1.16667 5.83317 1.16667H8.1665C8.74984 1.16667 9.33317 1.75001 9.33317 2.33334V3.50001"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.8335 6.41667V9.91667"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.1665 6.41667V9.91667"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}

export function EditarIcon() {
  const [editar, setEditar] = useState(false);
  return (
    <>
      <svg
        onClick={() => setEditar(!editar)}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.75 3.5H12.25"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.0832 3.5V11.6667C11.0832 12.25 10.4998 12.8333 9.9165 12.8333H4.08317C3.49984 12.8333 2.9165 12.25 2.9165 11.6667V3.5"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.6665 3.50001V2.33334C4.6665 1.75001 5.24984 1.16667 5.83317 1.16667H8.1665C8.74984 1.16667 9.33317 1.75001 9.33317 2.33334V3.50001"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.8335 6.41667V9.91667"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.1665 6.41667V9.91667"
          stroke="#8BA3BC"
          stroke-width="1.16667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}
