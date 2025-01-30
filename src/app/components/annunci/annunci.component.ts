import { Component } from '@angular/core';

@Component({
  selector: 'app-annunci',
  standalone: false,
  templateUrl: './annunci.component.html',
  styleUrls: ['./annunci.component.css'] // Nota: il nome corretto è style**s**Url
})
export class AnnunciComponent {
  selectedAnnuncio: any = null;

  annunci = [
    {

      foto: '/assets/appartamento.jpg',
      nome: 'Appartamento moderno con vista sul mare',
      descrizione:'ciao',
      prezzo: 200000,
      mq: 120,
      tipo: 'Appartamento', // Nuovo campo
      posizione: 'via giardini', // New York
      etichetta: 'A1', // Etichetta sul marker
      camere: 3, // Nuovo campo
      bagni: 2, // Nuovo campo
      anno: 2015 // Nuovo campo
    }
  ];

  constructor() {
    // Recupera la lista degli annunci dal localStorage se presente
    const annunciString = localStorage.getItem('annunci');
    if (annunciString) {
      this.annunci = JSON.parse(annunciString);
    }
  }

  selectAnnuncio(annuncio: any) {
    this.selectedAnnuncio = { ...annuncio }; // Clona l'annuncio
  }
}
