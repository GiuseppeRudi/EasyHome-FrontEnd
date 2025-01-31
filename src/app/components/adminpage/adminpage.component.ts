import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-adminpage',
  standalone: false,

  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent {
  username: string | null = '';

  constructor(private router: Router, private authService: AuthService) {
    this.username = sessionStorage.getItem('username'); // Recupera l'username dal
  }

  logout() {

    this.authService.logout(); // Invalida l'autenticazione (se implementata)
    sessionStorage.clear();
    this.router.navigate(['/']); // Reindirizza alla home
  }

}
