import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthComponent} from '../auth/auth.component';

import { DialogService} from '../../service/dialog.service';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems = [
    {label: 'Home', icon: 'home', route: '/'},
    {label: 'About', icon: 'info', route: '/about'},
    {label: 'Modifica/Aggiungi Annuncio', icon: 'build', route: '/services'},
    {label: 'Contatti', icon: 'contact_mail', route: '/contacts'},
  ];
  logged = false;
  @ViewChild('authOptionsDialog') authOptionsDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router: Router, private dialogService: DialogService, private service: ServiceService) {
  }
  username: string | null = null;

  openDialogWithPrevent(event: Event, dialogTemplate: TemplateRef<any>) {
    event.preventDefault(); // Previene la navigazione
    this.closeDialog(); // Chiude il dialog precedente, se aperto
    this.dialog.open(dialogTemplate, {
      width: '400px',
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  toggleLogin() {
    if (!this.logged) {
      this.openLoginDialog();
    } else {
      this.logout();
    }
  }

  navigateTo(route: string) {
    this.closeDialog(); // Chiude il popup
    this.router.navigate([route]); // Cambia la route
  }

  modificaAnnuncio() {
    if(this.username!=null) this.service.getImmobiliUtente(this.username).subscribe({
      next: (response) => {
          console.log(response)
      },
      error: (err) => console.error("GetImmobiliUtente doesn't work", err),
    });
  }

  openLoginDialog(): void {
    this.dialog.closeAll();
    this.dialogService.openDialog(AuthComponent);

  }

  logout(): void {
    localStorage.clear(); // Rimuove i dati dell'utente
    this.logged = false;
    this.username = null; // Resetta il nome utente
    this.router.navigate(['/']); // Torna alla home
  }

  ngOnInit(): void {
    // Verifica se l'utente è loggato all'inizio
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.logged = true;
      this.username = storedUsername; // Imposta il nome utente
    }
  }

}
