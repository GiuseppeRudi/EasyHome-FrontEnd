import {Component, OnInit} from '@angular/core';
import {Immobile} from '../../model/Immobile';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-annunci',
  standalone: false,
  templateUrl: './annunci.component.html',
  styleUrls: ['./annunci.component.css'] // Nota: il nome corretto è style**s**Url
})
export class AnnunciComponent  implements  OnInit{
  immobili: Immobile[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    // Controllo se ci sono dati salvati in LocalStorage
    const cachedImmobili = localStorage.getItem('immobili');
    if (cachedImmobili) {
      this.immobili = JSON.parse(cachedImmobili);
      console.log('Dati caricati da LocalStorage:', this.immobili);
    }

    // Chiamata al servizio per ottenere gli immobili
    this.service.getImmobiliObservable().subscribe(data => {
      console.log('Dati ricevuti dal backend:', data);

      if (data && data.length > 0) {
        this.immobili = data;
        localStorage.setItem('immobili', JSON.stringify(this.immobili));
        console.log('Dati salvati in LocalStorage:', localStorage.getItem('immobili'));
      }
    });
  }




}
