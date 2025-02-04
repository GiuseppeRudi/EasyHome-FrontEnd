import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { ImmobileMinimal } from '../../model/ImmobileMinimal';

@Component({
  selector: 'app-aste',
  standalone: false,
  templateUrl: './aste.component.html',
  styleUrls: ['./aste.component.css']
})
export class AsteComponent implements OnInit {
  aste: ImmobileMinimal[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {

    this.service.getImmobiliMinimal('Tutti','Aste','Tutte');

    const cachedAste = sessionStorage.getItem('aste');
    if (cachedAste) {
      this.aste = JSON.parse(cachedAste);
      console.log('Dati caricati da sessionStorage:', this.aste);
    }

    // Chiamata al servizio per ottenere gli immobili
    this.service.getImmobiliObservable().subscribe(data => {
      console.log('Dati ricevuti dal backend:', data);

      if (data && data.length > 0) {
        this.aste = data;
        sessionStorage.setItem('immobili', JSON.stringify(this.aste));
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
