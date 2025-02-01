import { Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ServiceService} from '../../service/service.service';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  selectedImmobili: string | null = 'Tipo';
  selectedAffittoVendita: string | null = 'Categoria';
  selectedLuogo: string | null = 'Provincia';
  hoveredCity: string | null = null;
  markers: { name: string; coordinates: LatLngLiteral }[] = [];
  center = { lat: 39.3042, lng: 16.2503 }; // Coordinate di Cosenza
  zoom = 14; // Livello di zoom

  // Lista dei luoghi (places) con nomi e coordinate
  places: { name: string; coordinates: LatLngLiteral; locations?: { name: string; coordinates: LatLngLiteral }[] }[] = [
    {
      name: 'Tutte',
      coordinates: { lat: 38.500, lng: 16.000 },
      locations: [
        { name: 'Piazza Bilotti', coordinates: { lat: 39.307, lng: 16.247 } },
        { name: 'Piazza Loreto', coordinates: { lat: 39.308, lng: 16.249 } },
        { name: 'Piazza Matteotti', coordinates: { lat: 38.910289,lng:16.5852798 } },
        { name: 'Corso Mazzini', coordinates: { lat:38.90595,lng:16.5897705 } },
        { name: 'Piazza Duomo', coordinates: { lat: 38.112, lng: 15.651 } },
        { name: 'Corso Garibaldi', coordinates: { lat: 38.113, lng: 15.653 } },
      ],
    },
    {
      name: 'Cosenza',
      coordinates: { lat: 39.305, lng: 16.250 },
      locations: [
        { name: 'Piazza Bilotti', coordinates: { lat: 39.307, lng: 16.247 } },
        { name: 'Piazza Loreto', coordinates: { lat: 39.308, lng: 16.249 } },
      ],
    },
    {
      name: 'Catanzaro',
      coordinates: { lat: 38.9092366,lng:16.585428 },
      locations: [
        { name: 'Piazza Matteotti', coordinates: { lat: 38.910289,lng:16.5852798 } },
        { name: 'Corso Mazzini', coordinates: { lat:38.90595,lng:16.5897705 } },
      ],
    },
    {
      name: 'Reggio Calabria',
      coordinates: { lat: 38.110, lng: 15.650 },
      locations: [
        { name: 'Piazza Duomo', coordinates: { lat: 38.112, lng: 15.651 } },
        { name: 'Corso Garibaldi', coordinates: { lat: 38.113, lng: 15.653 } },
      ],
    },
  ];

  constructor(public dialog: MatDialog ,private service: ServiceService) {}

  // Apre il dialog per selezionare un campo (Tipo Immobile, Tipo Annuncio, Luogo)
  openSelectDialog(
    templateRef: TemplateRef<any>,
    selectedField: 'selectedImmobili' | 'selectedAffittoVendita' | 'selectedLuogo'
  ) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(templateRef, {
      width: '100px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this[selectedField] = result;
      }
    });
  }

  // Funzione di selezione per le opzioni
  selectOption(dialogRef: MatDialogRef<any>, option: string) {
    dialogRef.close(option);
  }

  // Funzione per selezionare un luogo (aggiorna mappa e markers)
  selectLuogo(
    dialogRef: MatDialogRef<any>,
    option: string,
    cityCoordinates: LatLngLiteral
  ) {
    this.selectedLuogo = option;
    this.center = cityCoordinates; // Aggiorna il centro della mappa

    dialogRef.close(option);
  }

  // Funzione per aprire la mappa in un dialog
  openMap(templateRef: TemplateRef<any>, selectedField: 'selectedLuogo') {
    this.dialog.open(templateRef, {
      width: '800px'
    });
  }

  // Gestisce il mouse hover su una città
  onMouseEnter(city: any) {
    this.hoveredCity = city.name;
    this.center = city.coordinates; // Aggiorna il centro
    if(this.hoveredCity=='Tutte' && this.zoom!=8) this.zoom=8;
    else if(this.zoom!=14) this.zoom=14;
    this.markers = city.locations.map((location: any) => ({
      name: location.name,
      coordinates: location.coordinates,
    }));
  }
  isSelectionComplete(): boolean {
    return (
      this.selectedImmobili !== 'Tipo' &&
      this.selectedAffittoVendita !== 'Categoria' &&
      this.selectedLuogo !== 'Provincia'
    );
  }
  seeResults(): void {
    this.service.getImmobili(this.selectedImmobili, this.selectedAffittoVendita, this.selectedLuogo)
      .subscribe({
        next: (response) => {
          if (this.isSelectionComplete()) {
            console.log(response)
            //this.router.navigate(['/']); // Sostituisci con il tuo path
          }
        },
        error: (err) => console.error("GetImmobili doesn't work", err),
      });
  }


}
