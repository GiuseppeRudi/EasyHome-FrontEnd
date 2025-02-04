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



  getImageSrc(imagePath: string): string {
    return this.service.getImageSrc(imagePath);
  }


  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/no-image.png';
  }

}
