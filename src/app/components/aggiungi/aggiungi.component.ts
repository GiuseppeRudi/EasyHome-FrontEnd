import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ɵFormGroupRawValue, ɵGetProperty, ɵTypedOrUntyped} from '@angular/forms';
import { Router } from '@angular/router';
import {ServiceService} from '../../service/service.service';
import {GeocodingService} from '../../service/GeocodingService/geocoding-service.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-aggiungi',
  templateUrl: './aggiungi.component.html',
  styleUrls: ['./aggiungi.component.css'],
  standalone: false
})
export class AggiungiComponent {
  form: FormGroup;
  passoAttuale: number = 1;
  fotoFiles: any[] = [];
  googleMapsUrl: string = '';
  latitudine: number | null = null;
  longitudine: number | null = null;
  lat: number = 0;  // Inizializzato a 0
  lng: number = 0;  // Inizializzato a 0


  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Centro mappa
  zoom: number = 14; // Zoom della mappa


  constructor(private geocodingService: GeocodingService,private fb: FormBuilder, private router: Router, private service: ServiceService) {
    this.form = this.fb.group({
      nome:['',Validators.required],
      tipo: ['Vendita', Validators.required],
      descrizione: ['', Validators.required],
      categoria: ['Casa', Validators.required],
      prezzo: [0, Validators.required],
      mq: [0, Validators.required],
      camere: [0, Validators.required],
      bagni: [0, Validators.required],
      anno: [0, Validators.required],
      etichetta: ['', Validators.required],
      provincia: ['', Validators.required],
      indirizzo: ['', Validators.required],
      latitudine: [null, Validators.required],
      longitudine: [null, Validators.required],
      foto: [[], Validators.required]
    });
  }

  // Funzione per verificare l'indirizzo
  verificaIndirizzo(indirizzo: string) {
    console.log(indirizzo);
    if (indirizzo) {
      this.geocodingService.getLatLng(indirizzo).subscribe({
        next: (response) => {
          if (response.status === 'OK' && response.results.length > 0) {
            const location = response.results[0].geometry.location;

            if (location && location.lat && location.lng) {
              // Impostiamo latitudine e longitudine
              this.latitudine = location.lat;
              this.longitudine = location.lng;

            this.form.patchValue({
              latitudine: location.lat,
              longitudine: location.lng,
            });

              // Impostiamo la posizione del marker e il centro della mappa
              this.markerPosition = { lat: this.latitudine || 0, lng: this.longitudine || 0 };
              this.center = { lat: this.latitudine || 0, lng: this.longitudine || 0 };

              console.log('Latitudine:', this.latitudine);
              console.log('Longitudine:', this.longitudine);
            } else {
              console.error('Indirizzo non valido o non trovato');
            }
          }
        },
        error: (err) => console.error('Errore nella geocodifica', err)
      });
    }
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

  username: string | null = '';

  aggiungiAnnuncio() {

    if (this.form.valid) {

      const formData = new FormData();

      formData.append('nome', this.form.get('nome')?.value);
      formData.append('tipo', this.form.get('tipo')?.value);
      formData.append('descrizione', this.form.get('descrizione')?.value);
      formData.append('categoria', this.form.get('categoria')?.value);
      formData.append('prezzo', this.form.get('prezzo')?.value.toString());
      formData.append('mq', this.form.get('mq')?.value.toString());
      formData.append('camere', this.form.get('camere')?.value.toString());
      formData.append('bagni', this.form.get('bagni')?.value.toString());
      formData.append('anno', this.form.get('anno')?.value.toString());
      formData.append('etichetta', this.form.get('etichetta')?.value);
      formData.append('latitudine', this.form.get('latitudine')?.value);
      formData.append('longitudine', this.form.get('longitudine')?.value);
      formData.append('provincia', this.form.get('provincia')?.value);
      this.username = sessionStorage.getItem('username');
      console.log(sessionStorage.getItem('username'));
      if(this.username!=null) formData.append('user', this.username);

      if (this.fotoFiles.length > 0) {
        this.fotoFiles.forEach(file => {
          formData.append('foto', file, file.name);
        });
      }
      console.log('Annuncio da inviare:', formData);

      this.service.addAnnuncio(formData).subscribe({
        next: (response) => {
          alert('Annuncio aggiunto con successo!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Errore:', error);
          alert("Errore durante l'invio dell'annuncio.");
        }
      });
    } else {
      alert('Per favore, completa tutti i campi.');
    }
  }






}
