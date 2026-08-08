import { useEffect } from "react";
import type { setState } from "../components/header/header";
import axios from "axios";

export default function useContagem(setEstado: setState, url: string) {
  useEffect(() => {
    async function carregarContagem() {
      const response = await axios.get(url);
      setEstado(response.data.length);
    }
    carregarContagem();
  }, []);
}
