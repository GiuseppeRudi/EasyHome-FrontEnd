import { Component } from '@angular/core';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  standalone: false,
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent {
  constructor(private service: ServiceService) {}

  createAd() {
    this.service.createAd('Annuncio Test', '1234567890', '0987654321')
      .subscribe(response => console.log('Annuncio creato:', response));
  }
}
