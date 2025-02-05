import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false,
  styleUrls: ['./app.component.css'] // Corretto il nome dell'attributo da `styleUrl` a `styleUrls`
})
export class AppComponent implements OnInit {
  title = 'prova2';
  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Ascolta gli eventi del router per rilevare quando inizia e finisce una navigazione
    this.router.events.subscribe(event => {
      console.log("prova")
      if (event instanceof NavigationStart) {
        // Mostra lo spinner quando la navigazione inizia
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        // Nascondi lo spinner quando la navigazione è terminata (sia con successo che con errore)
        this.loading = false;
      }
    });
  }
}
