export interface Immobile {
  immagine: string;
  id: number;
  nome: string;
  tipo?: string;         // Può essere null
  descrizione?: string;  // Può essere null
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
