export interface ImmobileMinimal {
    id: number;
    nome: string;
    prezzo: number;
    tipo: string;
    categoria: string;
    mq: number;
    immagine?: string;  // Base64 image string
}
