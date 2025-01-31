import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../service/service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,private service: ServiceService,private router: Router) {
    this.contactForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cognome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      domanda: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {

      console.log('Form Submitted', this.contactForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  aggiungiContatto() {
    if (this.contactForm.valid) {
      console.log('Contatto da inviare:', this.contactForm.value);  // Verifica cosa stai inviando

      // Invia i dati come oggetto JSON
      this.service.addrichiesta(this.contactForm.value).subscribe({
        next: (response) => {
          alert('Contatto aggiunto con successo!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Errore:', error);
          alert("Errore durante l'invio del contatto.");
        }
      });
    } else {
      alert('Per favore, completa tutti i campi.');
    }
  }




}
