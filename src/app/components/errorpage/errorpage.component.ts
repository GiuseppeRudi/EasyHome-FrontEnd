import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-errorpage',
  standalone: false,

  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.css'
})
export class ErrorpageComponent {
  errorCode: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Ottieni il codice di errore dalla route
    this.route.params.subscribe(params => {
      this.errorCode = +params['errorCode']; // "+" converte il parametro in un numero
    });
  }
}
