import {Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css'],
  standalone: false
})
export class RecensioneComponent {
  @Input() immobileId!: number;
  username: string | null = '';
  form: FormGroup;
  rating: number = 0; // Valore del rating delle stelle
  descrizione: string = ''; // Descrizione della recensione

  constructor(private fb: FormBuilder, private router: Router, private service: ServiceService) {
    this.form = this.fb.group({
      rating: [0, Validators.required], // Rating delle stelle
      descrizione: ['', Validators.required] // Descrizione
    });
  }

  // Funzione per gestire la selezione del rating
  setRating(value: number) {
    this.rating = value;
    this.form.get('rating')?.setValue(value); // Imposta il valore nel form
  }

  // Funzione per inviare la recensione al backend
  submitRecensione() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('rating', this.form.get('rating')?.value.toString());
      formData.append('descrizione', this.form.get('descrizione')?.value);
      formData.append('idImmobile', this.immobileId.toString());

      this.username = sessionStorage.getItem('username');

      if(this.username!=null) formData.append('acquirente', this.username);
      console.log('Form Submitted', formData.keys());

      // Chiamata al servizio per inviare la recensione
      this.service.addRecensione(formData).subscribe({
        next: (response) => {
          alert('Recensione inviata con successo!');

        },
        error: (error) => {
          console.error('Errore durante l\'invio della recensione', error);
          alert('Errore durante l\'invio della recensione.');
        }
      });
    } else {
      alert('Per favore, completa tutti i campi.');
    }
  }
}
