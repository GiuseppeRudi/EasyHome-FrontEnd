import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-adminpage',
  standalone: false,

  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent {
  constructor(private router: Router, private authService: AuthService){}

  logout() {
    this.authService.logout(); // Invalida l'autenticazione (se implementata)
    this.router.navigate(['/']); // Reindirizza alla home
  }

}
