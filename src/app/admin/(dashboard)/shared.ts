import type { CategoriaListItem, GaleriaItem, HorarioListItem, NoticiaListItem } from '@/lib/types';

export interface CollectionResponse<T> {
  categorias?: T[];
  galeria?: T[];
  horarios?: T[];
  noticias?: T[];
}

export async function readJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type AdminCategoria = CategoriaListItem;
export type AdminHorario = HorarioListItem;
export type AdminNoticia = NoticiaListItem;
export type AdminGaleria = GaleriaItem;
