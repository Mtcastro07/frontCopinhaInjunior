import { api } from "../api";
import { mockNoticias } from "../mocks/mockData";
 
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export type Noticia = {
  id: string;
  titulo: string;
  subtitulo: string;
  autor: string;
  dataPostagem: string;
  imagem: string;
  descricaoCompleta: string;
}
 
export async function getNoticia(limite?: number): Promise<Noticia[]> {
  if (USE_MOCK) return limite ? mockNoticias.slice(0, limite) : mockNoticias;
  const { data } = await api.get<Noticia[]>("/noticias", {
    params: limite ? { limite } : undefined,
  });
  return data;
}
 

export async function getNoticiaById(id: string): Promise<Noticia> {
  const { data } = await api.get<Noticia>(`/noticias/${id}`);
  return data;
}
 

export async function deleteNoticia(id: string): Promise<void> {
  await api.delete(`/noticias/${id}`);
}
