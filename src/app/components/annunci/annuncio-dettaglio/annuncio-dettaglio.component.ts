import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-annuncio-dettaglio',
  templateUrl: './annuncio-dettaglio.component.html',
  styleUrls: ['./annuncio-dettaglio.component.css'],
  standalone: false
})

export class AnnuncioDettaglioComponent implements OnInit {
  form: FormGroup;
  immobileId!: number;
  latitudine: number | null = null;
  longitudine: number | null = null;
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Centro mappa
  zoom: number = 14; // Zoom della mappa

  constructor(private fb: FormBuilder,private route:ActivatedRoute) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
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
      foto: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.immobileId = Number(params.get('id'));
      console.log('ID immobile ricevuto:', this.immobileId);});

    // Questo metodo viene chiamato ogni volta che il componente viene caricato o aggiornato
    this.latitudine = parseFloat(this.form.value.latitudine);
    this.longitudine = parseFloat(this.form.value.longitudine);
    if (this.latitudine && this.longitudine) {
      this.markerPosition = { lat: this.latitudine, lng: this.longitudine };
      this.center = { lat: this.latitudine, lng: this.longitudine };
    }
  }


}
