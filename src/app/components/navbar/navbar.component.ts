import {Component, TemplateRef, ViewChild} from '@angular/core';
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
export class NavbarComponent {
  menuItems = [
    {label: 'Home', icon: 'home', route: '/'},
    {label: 'About', icon: 'info', route: '/about'},
    {label: 'Modifica/Aggiungi Annuncio', icon: 'build', route: '/services'},
    {label: 'Contatti', icon: 'contact_mail', route: '/contacts'},
  ];
  logged = false;
  @ViewChild('authOptionsDialog') authOptionsDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router: Router, private dialogService: DialogService) {
  }

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
    this.logged = !this.logged;
  }

  navigateTo(route: string) {
    this.closeDialog(); // Chiude il popup
    this.router.navigate([route]); // Cambia la route
  }

  openLoginDialog(): void {
    this.dialog.closeAll();
    this.dialogService.openDialog(AuthComponent);

  }


}

