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
      nome:['',Validators.required],
      foto: [[], Validators.required],
      descrizione: ['', Validators.required],
      tipo: ['vendita', Validators.required],
      prezzo: [0, Validators.required],
      mq: [0, Validators.required],
      camere: [0, Validators.required],
      bagni: [0, Validators.required],
      anno: [0, Validators.required],
      etichetta: ['', Validators.required],
      posizione: ['', Validators.required]
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
      const nuoviFiles = Array.from(files);
      this.fotoFiles.push(...nuoviFiles);

      // Aggiorna il form control con l'array di file
      this.form.get('foto')?.setValue(this.fotoFiles);

      // Anteprima
      for (let file of nuoviFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.anteprimaImmagini.push(e.target.result);
        };
        reader.readAsDataURL(file);
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
      const formData = new FormData();

      // Aggiungi tutti i campi del form al FormData
      formData.append('nome', this.form.get('nome')?.value);
      //formData.append('foto', this.form.get('foto')?.value);
      formData.append('descrizione', this.form.get('descrizione')?.value);
      formData.append('tipo', this.form.get('tipo')?.value);
      formData.append('prezzo', this.form.get('prezzo')?.value);
      formData.append('mq', this.form.get('mq')?.value);
      formData.append('camere', this.form.get('camere')?.value);
      formData.append('bagni', this.form.get('bagni')?.value);
      formData.append('anno', this.form.get('anno')?.value);
      formData.append('etichetta', this.form.get('etichetta')?.value);
      formData.append('posizione', this.form.get('posizione')?.value);


      if (this.fotoFiles && this.fotoFiles.length > 0) {
        for (let i = 0; i < this.fotoFiles.length; i++) {
          formData.append('foto', this.fotoFiles[i], this.fotoFiles[i].name);  // Aggiungi ogni file
        }
      }

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
