import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
export class NavbarComponent implements OnInit{
  logged = false; // Stato di login
  username: string | null = null;
  userRole: string | null = null;
  isVenditore = false;
  @ViewChild('authOptionsDialog') authOptionsDialog!: TemplateRef<any>;

  menuItems = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'About', icon: 'info', route: '/about' },
    { label: 'Aste', icon: 'gavel', route: '/aste' },  // Aste visibile sia loggato che non loggato
    { label: 'Contatti', icon: 'contact_mail', route: '/contacts' },
  ];

  constructor(private cdRef: ChangeDetectorRef , private dialog: MatDialog, private router: Router, private dialogService: DialogService,private service: ServiceService) {}



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

  toggleLogin() {
    if (!this.logged) {
      this.openLoginDialog();
    } else {
      this.logout();
    }
  }

  // Navigazione tra le route con ritardo
  navigateTo(route: string) {
    this.closeDialog(); // Chiudi il dialogo prima della navigazione
    setTimeout(() => {
      this.router.navigate([route]); // Naviga alla route dopo un ritardo
    }, 150); // Ritardo di 500 millisecondi (0.5 secondi)
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

  // Logout dell'utente
  logout(): void {
    sessionStorage.clear(); // Resetta i dati dell'utente
    this.userRole = null;
    this.logged = false;
    this.username = null;
    this.removeModifyItem();
    this.router.navigate(['/']); // Torna alla home
  }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole');
    this.username = sessionStorage.getItem('username');
    if (this.username) {
      this.logged = true;
      this.isVenditore = this.userRole === 'venditore'; // Imposta il ruolo iniziale
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
    this.removeModifyItem();
    if (this.logged && this.isVenditore) {
      this.menuItems.push({ label: 'Modifica/Aggiungi Annuncio', icon: 'build', route: '/services' });
    }

  }

  toggleRole() {
    this.isVenditore = !this.isVenditore; // Cambia il ruolo
    this.userRole = this.isVenditore ? 'venditore' : 'acquirente'; // Salva il nuovo ruolo
    sessionStorage.setItem('userRole', this.userRole); // Salva il ruolo in sessionStorage
    console.log(this.isVenditore ? 'Venditore' : 'Acquirente');

    this.updateMenuItems();  // Aggiorna i menu
    this.cdRef.detectChanges(); // Forza l'aggiornamento della vista
  }

}
