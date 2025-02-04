import { Component } from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {ImmobileMinimal} from '../../model/ImmobileMinimal';

@Component({
  selector: 'app-modifica',
  standalone: false,

  templateUrl: './modifica.component.html',
  styleUrl: './modifica.component.css'
})
export class ModificaComponent {


  modificaMinimal: ImmobileMinimal[] = [];
  constructor(private service: ServiceService) {}

  ngOnInit() {

    const cachedModifica = sessionStorage.getItem('modifica');
    console.log('Session Storage:', cachedModifica);


    if (cachedModifica) {
      this.modificaMinimal = JSON.parse(cachedModifica);
      console.log('Dati caricati da sessionStorage:', this.modificaMinimal);
    } else {
      this.service.getModificaObservable().subscribe(data => {
        console.log('Dati ricevuti dal backend:', data);
        if (data && data.length > 0) {
          this.modificaMinimal = data;
          sessionStorage.setItem('modifica', JSON.stringify(this.modificaMinimal));
        }
      });
    }
  }


  getImageSrc(imagePath: string): string {
    return this.service.getImageSrc(imagePath);
  }


  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/no-image.png';
  }


}
