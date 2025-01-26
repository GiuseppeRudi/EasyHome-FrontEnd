import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone:false
})
export class MapComponent {
  center = { lat: 39.3042, lng: 16.2503 }; // Coordinate di Cosenza
  zoom = 12; // Livello di zoom
  markerPosition = { lat: 39.3042, lng: 16.2503 }; // Stessa posizione per il marker
  options: google.maps.MapOptions = {
    disableDefaultUI: false, // Mostra i controlli di default
    scrollwheel: true,      // Abilita lo zoom con scroll
    fullscreenControl: true // Mostra il controllo fullscreen
  };

  // Puoi aggiungere metodi per aggiornare dinamicamente la mappa
  updateCenter(lat: number, lng: number): void {
    this.center = { lat, lng };
  }


}
