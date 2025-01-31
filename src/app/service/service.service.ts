import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Immobile} from '../model/Immobile';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'api';

  private immobiliSubject = new BehaviorSubject<Immobile[]>([]); // Memorizza gli immobili
  immobili$ = this.immobiliSubject.asObservable(); // Espone gli immobili come Observable


  getImmobili(tipo: string | null, affittoVendita: string | null, luogo: string | null): void {
    const params = {
      tipo: tipo || '',
      categoria: affittoVendita || '',
      provincia: luogo || ''
    };

    this.http.get<Immobile[]>(`${this.apiUrl}/open/immobili`, {
      params: params,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }).subscribe({
      next: (immobili) => {
        this.immobiliSubject.next(immobili); // Aggiorna il BehaviorSubject con i dati ricevuti
      },
      error: (err) => console.error("Errore nel caricamento degli immobili", err),
    });
  }

  getImmobiliObservable(): Observable<Immobile[]> {
    return this.immobili$; // Espone gli immobili come Observable
  }


  addAnnuncio(formData: FormData): Observable<any> {

    return this.http.post(`${this.apiUrl}/auth/immobili/createImmobile`, formData, {

      withCredentials: true
    });
  }
  addRecensione(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/createRecensione`, formData, {

      withCredentials: true
    });
  }
  addrichiesta(contatti: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/CreaRichiesta`, contatti, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }




  getUsernames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/open/users`);  // Restituisce la lista degli utenti
  }


}

