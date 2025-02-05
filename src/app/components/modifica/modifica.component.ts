import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {ImmobileMinimal} from '../../model/ImmobileMinimal';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrl: './modifica.component.css',
  standalone: false,
})

export class ModificaComponent implements OnInit{


  modificaMinimal: ImmobileMinimal[] = [];
  constructor(private service: ServiceService) {}

  ngOnInit() {

    let username = sessionStorage.getItem('username');
    if (username) {
      this.service.getImmobiliMinimalByUsername(username);
    }



      this.service.getModificaObservable().subscribe(data => {
        console.log('Dati ricevuti dal backend:', data);
        if (data && data.length > 0) {
          this.modificaMinimal = data;
          sessionStorage.setItem('modifica', JSON.stringify(this.modificaMinimal));
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
