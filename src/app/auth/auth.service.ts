import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserRole} from './user-role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'api';

  // Stream reattivo per i dati dell'utente
  currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<void> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<void>(`${this.apiUrl}/login`, body.toString(), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true, // Per inviare il cookie di sessione
    });
  }

  register(form: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/open/createUser`, form, {
      headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'},
      withCredentials: true, // Per inviare i cookie di sessione
    });
  }


  


  getUser(): Observable<any | null> {
    if (this.currentUserSubject.value) {
      return of(this.currentUserSubject.value);
    }

    // Effettua la richiesta solo se currentUserSubject è null
    return this.http.get<any>(`/api/auth/check-user`, {
      withCredentials: true,
    }).pipe(
      switchMap((user) => {
        this.currentUserSubject.next(user);  // Salva l'utente se autenticato
        return of(user);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);  // In caso di errore, resetta l'utente
        return of(null);
      })
    );
  }

}
