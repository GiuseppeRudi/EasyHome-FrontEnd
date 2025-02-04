import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import {ImmobileMinimal} from '../../model/ImmobileMinimal';

@Component({
  selector: 'app-annunci',
  standalone: false,
  templateUrl: './annunci.component.html',
  styleUrls: ['./annunci.component.css']
})
export class AnnunciComponent implements OnInit {
  immobiliminimal: ImmobileMinimal[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    const cachedImmobili = localStorage.getItem('immobili');
    if (cachedImmobili) {
      this.immobiliminimal = JSON.parse(cachedImmobili);
      console.log('Dati caricati da LocalStorage:', this.immobiliminimal);
    }

    // Chiamata al servizio per ottenere gli immobili
    this.service.getImmobiliObservable().subscribe(data => {
      console.log('Dati ricevuti dal backend:', data);

      if (data && data.length > 0) {
        this.immobiliminimal = data;
        localStorage.setItem('immobili', JSON.stringify(this.immobiliminimal));
      }
    });
  }



  getImageSrc(immobile: ImmobileMinimal): string {
    console.log(immobile.immagine);

    if (immobile.immagine) {
      // Estrai il folder e imageName dalla stringa immagine
      const parts = immobile.immagine.split('/');
      const folder = parts[0];
      const folder1 = parts[1];   // La parte "36" (folder)
      const imageName = parts[2]; // La parte "1737447259840.jpg" (imageName)

      // Restituisci l'URL per la richiesta al back-end
      return `/api/open/images/${folder}/${folder1}/${imageName}`;
    } else {
      // Restituisci un'immagine di fallback
      return 'assets/no-image.png';
    }
  }


  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/no-image.png';
  }

}
