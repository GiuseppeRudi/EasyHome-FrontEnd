export interface Immobile {
  immagine: string;
  id: number;
  nome: string;
  tipo?: string;
  descrizione?: string;
  categoria?: string;
  prezzo?: number;
  mq?: number;
  camere?: number;
  bagni?: number;
  anno?: number;
  etichetta?: string;
  provincia?: string;
  latitudine?: number;
  longitudine?: number;
}
