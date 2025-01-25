import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'api';
  currentUserSubject = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<void>(`${this.apiUrl}/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true, // Per inviare il cookie di sessione
    });
  }


  logout(): Observable<void> {
    console.log("performing logout");

    return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap( ()=>
        { this.currentUserSubject.next(null);}
      ));
  }
}
