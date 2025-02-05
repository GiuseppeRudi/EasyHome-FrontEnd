import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../service/service.service';


@Component({
  selector: 'app-annuncio-dettaglio',
  templateUrl: './annuncio-dettaglio.component.html',
  styleUrls: ['./annuncio-dettaglio.component.css'],
  standalone: false
})
export class AnnuncioDettaglioComponent implements OnInit {
  form: FormGroup;
  immobileId!: number;
  immobileDetails: any;
  latitudine: number | null = null;
  longitudine: number | null = null;
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom: number = 14;
  loading: boolean = true;
  recensioni: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ServiceService
  ) {
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
      provincia: ['', Validators.required],
      fotoPaths: [[]] // Array di immagini
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.immobileId = Number(params.get('id'));
      console.log('ID immobile ricevuto:', this.immobileId);

      this.service.getImmobileById(this.immobileId).subscribe((data) => {
        console.log(data);
        this.immobileDetails = data;
        this.form.patchValue(this.immobileDetails);
        this.latitudine = this.immobileDetails.latitudine;
        this.longitudine = this.immobileDetails.longitudine;

        console.log(this.immobileDetails.utente.username);
        this.caricaRecensioni(this.immobileDetails.utente.username)

        // Imposta la mappa
        if (this.latitudine && this.longitudine) {
          this.markerPosition = { lat: this.latitudine, lng: this.longitudine };
          this.center = { lat: this.latitudine, lng: this.longitudine };
        }
      });
    });
  }

  getImageSrc(imagePath: string): string {
    return this.service.getImageSrc(imagePath);
  }


  caricaRecensioni(venditore : string) {
    if (venditore) {
      this.service.getRecensioniByVenditore(venditore).subscribe(
        (data) => {
          this.recensioni = data;
          this.loading = false;
        },
        (error) => {
          console.error('Errore nel caricamento delle recensioni:', error);
          this.loading = false;
        }
      );
    }
  }

}
