import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormControl } from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css',
  standalone:false
})
export class AdminpageComponent implements OnInit {
  username: string | null = '';
  usernameToBan: string = '';
  userList: { username: string; role: string }[] = [];

  changeUserTypeForm: FormGroup;
  banUserForm: FormGroup;

  constructor(private navbar: NavbarComponent,
    private router: Router,
    private authService: AuthService,
    private service: ServiceService
  ) {
    this.username = sessionStorage.getItem('username');

    this.changeUserTypeForm = new FormGroup({
      user_id_1: new FormControl(''),
      user_type: new FormControl('')
    });

    this.banUserForm = new FormGroup({
      user_id_2: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadUserList();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.clear();
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Errore nel recupero degli utenti:', err),
    });
  }

  loadUserList(): void {
    this.service.getUsers().subscribe({
      next: (users) => {
        console.log("Dati ricevuti dal server:", users);
        this.userList = users;
      },
      error: (err) => console.error('Errore nel recupero degli utenti:', err),
    });
  }
  errorMessage: string = '';

  deleteUser(username: string): void {
    this.service.deleteUser(username).subscribe({
      next: (response) => {
        // Successo nella cancellazione
        console.log('Utente eliminato:', response);
        window.location.reload();
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Errore nell\'eliminazione dell\'utente:', err);
        if (err.status === 404) {
          this.errorMessage = 'L\'utente non esiste';
        } else {
          this.errorMessage = 'Si è verificato un errore nell\'eliminazione dell\'utente';
        }
      }
    });
    this.usernameToBan = '';
  }



  onChangeUserType() {
    const username = this.changeUserTypeForm.value.user_id_1;
    const newRole = this.changeUserTypeForm.value.user_type;

    if (!username || !newRole) {
      console.error("Errore: username e ruolo sono obbligatori!");
      return;
    }

    this.service.changeUserRole(username, newRole).subscribe({
      next: (response) => {
        console.log("Ruolo cambiato con successo:", response);
        alert("Ruolo aggiornato con successo!");
        window.location.reload();
      },
      error: (error) => {
        console.error("Errore nel cambiare il ruolo:", error);
        alert("Errore nel cambio ruolo");
      }
    });
  }

}
