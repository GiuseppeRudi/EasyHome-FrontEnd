import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-aggiungi',
  templateUrl: './aggiungi.component.html',
  styleUrls: ['./aggiungi.component.css'],
  standalone: false
})
export class AggiungiComponent {
  form: FormGroup;
  passoAttuale: number = 1;
  tipoAnnuncio: string = 'vendita'; // Impostato come "vendita" di default
  fotoFiles: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private service: ServiceService) {
    this.form = this.fb.group({
      foto: [[], Validators.required],
      descrizione: ['', Validators.required],
      tipo: ['vendita', Validators.required],
      prezzo: [0, Validators.required],
      mq: [0, Validators.required],
      camere: [0, Validators.required],
      bagni: [0, Validators.required],
      anno: [0, Validators.required],
      etichetta: ['', Validators.required],
      posizione: this.fb.group({
        lat: [0, Validators.required],
        lng: [0, Validators.required]
      })
    });

    this.form.get('tipo')?.valueChanges.subscribe(value => {
      this.tipoAnnuncio = value;
      this.passoAttuale = 1; // Reset dei passi quando cambia il tipo di annuncio
    });
  }

  // Funzione per gestire il caricamento dei file
  anteprimaImmagini: string[] = [];

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.anteprimaImmagini = [];  // Pulisce l'array
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          //console.log("Anteprima immagine:", e.target.result);
          this.anteprimaImmagini.push(e.target.result);  // Aggiungi l'immagine in base64 all'array
          //console.log("Anteprima immagini:", this.anteprimaImmagini);  // Verifica l'array
        };
        reader.readAsDataURL(files[i]);  // Legge il file come base64
      }
    }
  }



  passaPasso() {
    if (this.passoAttuale < 3) {
      this.passoAttuale++;
    }
  }

  tornaPasso() {
    if (this.passoAttuale > 1) {
      this.passoAttuale--;
    }
  }

  aggiungiAnnuncio() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.foto = this.anteprimaImmagini; // Aggiungi le immagini all'oggetto

      this.service.addAnnuncio(formData).subscribe({
        next: (response) => {
          alert('Annuncio aggiunto con successo!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert("Errore durante l'invio dell'annuncio.");
          console.error(error);
        }
      });
    } else {
      alert('Per favore, completa tutti i campi.');
    }
  }
}
