import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Questo permette di utilizzare il servizio in tutta l'app
})
export class MapService {
  latitude: number = 39.30709457397461;  // Latitudine di default
  longitude: number = 16.246896743774414;  // Longitudine di default
  zoom: number = 14;  // Livello di zoom di default

  constructor() { }

  /**
   * Metodo per aggiornare la posizione della mappa
   * @param lat Latitudine
   * @param lng Longitudine
   */
  setMapLocation(lat: number, lng: number): void {
    this.latitude = lat;
    this.longitude = lng;
    console.log(`Posizione aggiornata a: ${lat}, ${lng}`);
  }

  /**
   * Metodo per ottenere le coordinate attuali
   * @returns Oggetto con latitudine e longitudine
   */
  getCoordinates() {
    return { lat: this.latitude, lng: this.longitude };
  }
}
