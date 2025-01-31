import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {NavbarComponent} from '../navbar/navbar.component';

import { ServiceService } from '../../service/service.service';
import { FormGroup, FormControl } from '@angular/forms';  // <-- Importa i moduli per i form

@Component({
  selector: 'app-adminpage',
  standalone: false,
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent implements OnInit {
  username: string | null = '';
  userList: string[] = [];  // Array per contenere gli username

  // Aggiungi i FormGroup per gestire i form
  changeUserTypeForm: FormGroup;
  banUserForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private service: ServiceService  // Inietta il servizio
  ) {
    this.username = sessionStorage.getItem('username');

    // Inizializza i form
    this.changeUserTypeForm = new FormGroup({
      user_id_1: new FormControl(''),
      user_type: new FormControl('')
    });

    this.banUserForm = new FormGroup({
      user_id_2: new FormControl('')
    });
  }

  ngOnInit(): void {
    console.log("prova");
    this.loadUsernames();  // Carica gli username al caricamento del componente
  }

  logout() {

    this.authService.logout(); // Invalida l'autenticazione (se implementata)
    sessionStorage.clear();
    this.router.navigate(['/']); // Reindirizza alla home
  }

  loadUsernames(): void {
    this.service.getUsernames().subscribe({
      next: (users) => {
        console.log("Dati ricevuti dal server:", users); // Stampa i dati ricevuti
        this.userList = users; // Assegna direttamente l'array se è già un array di stringhe
      },
      error: (err) => console.error('Errore nel recupero degli utenti:', err),
    });
  }



  // Metodo per gestire il cambio di ruolo
  onChangeUserType() {
    console.log(this.changeUserTypeForm.value);
    // Qui puoi fare una chiamata al backend per aggiornare il ruolo dell'utente
  }

  // Metodo per gestire il ban dell'utente
  onBanUser() {
    console.log(this.banUserForm.value);
    // Qui puoi fare una chiamata al backend per bannare l'utente
  }
}
