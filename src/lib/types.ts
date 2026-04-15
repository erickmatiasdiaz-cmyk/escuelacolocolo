export interface CategoriaListItem {
  id: string;
  nombre: string;
  descripcion: string | null;
  edadMinima: number | null;
  edadMaxima: number | null;
  imagen: string | null;
  activo: boolean;
  orden: number;
  _count?: {
    horarios: number;
  };
}

export interface HorarioListItem {
  id: string;
  categoriaId: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  sede: string | null;
  activo: boolean;
  categoria?: {
    id: string;
    nombre: string;
    orden?: number;
  } | null;
}

export interface NoticiaListItem {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  resumen: string | null;
  imagen: string | null;
  publicado: boolean;
  fechaPubli: string | Date | null;
  createdAt: string | Date;
}

export interface GaleriaItem {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen: string;
  categoria: string | null;
  orden: number;
  activo: boolean;
  createdAt?: string | Date;
}

export interface AdminUser {
  userId: string;
  username: string;
  rol: string;
  nombre?: string;
}
