import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthComponent} from '../auth/auth.component';

import { DialogService} from '../../service/dialog.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  logged = false; // Stato di login
  username: string | null = null;

  @ViewChild('authOptionsDialog') authOptionsDialog!: TemplateRef<any>;

  menuItems = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'About', icon: 'info', route: '/about' },
    { label: 'Aste', icon: 'gavel', route: '/aste' },  // Aste visibile sia loggato che non loggato
    { label: 'Contatti', icon: 'contact_mail', route: '/contacts' },
  ];

  constructor(private dialog: MatDialog, private router: Router, private dialogService: DialogService) {}

  // Metodo per aprire il dialogo di login o registrazione
  openDialogWithPrevent(event: Event, dialogTemplate: TemplateRef<any>) {
    event.preventDefault();
    this.closeDialog();
    this.dialog.open(dialogTemplate, {
      width: '400px',
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  // Toggle tra login/logout
  toggleLogin() {
    if (!this.logged) {
      this.openLoginDialog();
    } else {
      this.logout();
    }
  }

  // Apre il dialog di login
  openLoginDialog(): void {
    this.dialog.closeAll();
    this.dialogService.openDialog(AuthComponent);
  }

  // Logout dell'utente
  logout(): void {
    sessionStorage.clear(); // Resetta i dati dell'utente
    this.logged = false;
    this.username = null;
    this.removeModifyItem();
    this.router.navigate(['/']); // Torna alla home
  }

  // Navigazione tra le route con ritardo
  navigateTo(route: string) {
    this.closeDialog(); // Chiudi il dialogo prima della navigazione
    setTimeout(() => {
      this.router.navigate([route]); // Naviga alla route dopo un ritardo
    }, 150); // Ritardo di 500 millisecondi (0.5 secondi)
  }


  // ngOnInit per gestire lo stato di login al caricamento del componente
  ngOnInit(): void {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      this.logged = true;
      this.username = storedUsername; // Imposta il nome utente
      this.updateMenuItems();
    }
  }

  removeModifyItem() {
    const modifyItemIndex = this.menuItems.findIndex(item => item.label === 'Modifica/Aggiungi Annuncio');
    if (modifyItemIndex !== -1) {
      this.menuItems.splice(modifyItemIndex, 1); // Rimuove l'elemento
    }
  }

  // Metodo per aggiornare i menu dinamicamente
  updateMenuItems(): void {
    if (this.logged) {
      // Aggiungi "Modifica/Aggiungi Annuncio" solo se loggato
      this.menuItems.push({ label: 'Modifica/Aggiungi Annuncio', icon: 'build', route: '/services' });
    }

  }

}
