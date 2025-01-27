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

  register(firstName: string, lastName: string, birthdate: string, country: string, username: string, email: string, password: string): Observable<void> {
    const body = {
      nome: firstName,
      cognome: lastName,
      data_nascita: birthdate,
      nazionalita: country,
      username: username,
      email: email,
      password: password,
    };

    return this.http.post<void>(`${this.apiUrl}/open/v1/createUser`, body, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true, // Per inviare i cookie di sessione
    });
  }


  logout(): Observable<void> {
    console.log("performing logout");

    return this.http.post<void>(`${this.apiUrl}/logout`, {}, {withCredentials: true})
      .pipe(tap(() => {
          this.currentUserSubject.next(null);
        }
      ));
  }


  getUser(): Observable<any | null> {
    if (this.currentUserSubject.value) {
      // Se l'utente è già presente, restituisci il valore
      return of(this.currentUserSubject.value);
    }

// Altrimenti, effettua una chiamata HTTP per recuperare l'utente
    return this.http.get<any>(`/api/auth/v1/check-user`, {
      withCredentials: true,
    }).pipe(
      switchMap((user) => {
        // Se l'utente è autenticato, aggiorna il BehaviorSubject
        this.currentUserSubject.next(user);
        return of(user);
      }),
      catchError(() => {
        // In caso di errore (es: 401 Unauthorized), restituisci null
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }
}
