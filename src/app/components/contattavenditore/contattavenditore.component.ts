import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contattavenditore',
  templateUrl: './contattavenditore.component.html',
  styleUrls: ['./contattavenditore.component.css'],
  standalone:false
})
export class ContattavenditoreComponent {
  @Input() codiceAnnuncio: string = '';
  @Input() nomeVenditore: string = '';

  contactForm: FormGroup;
  showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      messaggio: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.contactForm.reset()
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.closeModal();  // Chiude la modale dopo l'invio
    } else {
      console.log('Form is invalid');
    }
  }
}
