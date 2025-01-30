import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Immobile} from '../model/Immobile';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'api';

  getImmobili(tipo: string | null, affittoVendita: string | null, luogo: string | null): Observable<Immobile[]> {
    const params = {
      tipo: tipo || '',
      affitoVendita: affittoVendita || '',
      luogo: luogo || ''
    };

    // Usando query params anziché path params, che è una pratica più comune nelle chiamate API
    return this.http.get<Immobile[]>(`${this.apiUrl}/open/immobili`, {
      params: params, // Query params
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // Se necessario inviare i cookie di sessione
    });
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




}
