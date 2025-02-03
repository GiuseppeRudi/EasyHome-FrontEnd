import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-contattavenditore',
  templateUrl: './contattavenditore.component.html',
  styleUrls: ['./contattavenditore.component.css'],
  standalone:false
})
export class ContattavenditoreComponent {
  @Input() immobileId!: number;
  contactForm: FormGroup;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private service: ServiceService) {
    this.contactForm = this.fb.group({
      oggetto: ['', [Validators.required]],
      descrizione: ['']
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.contactForm.reset()
  }

  username: string | null = '';

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = new FormData();

      formData.append('oggetto', this.contactForm.get('oggetto')?.value);
      formData.append('descrizione', this.contactForm.get('descrizione')?.value);
      formData.append('idImmobile', this.immobileId.toString());

      this.username = sessionStorage.getItem('username');

      if(this.username!=null) formData.append('acquirente', this.username);
      console.log('Form Submitted', this.contactForm.value);

      this.service.contattaVenditore(formData).subscribe({
        next: (response) => {
          alert('Annuncio aggiunto con successo!');
        },
        error: (error) => {
          console.error('Errore:', error);
          alert("Errore durante l'invio del messaggio.");
        }
      })
      this.closeModal();  // Chiude la modale dopo l'invio
    } else {
      console.log('Form is invalid');
    }
  }
}
