import { Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface Location {
  name: string;
  coordinates: LatLngLiteral;
}

interface Place {
  name: string;
  coordinates: LatLngLiteral;
  locations: Location[];
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedImmobili: string | null = 'Tipo Immobile';
  selectedAffittoVendita: string | null = 'Tipo Annuncio';
  selectedLuogo: string | null = 'Luogo';
  hoveredCity: string | null = null;

  markers: { name: string, coordinates: LatLngLiteral }[] = [];
  places: Place[] = [
    {
      name: 'Roma',
      coordinates: { lat: 41.9028, lng: 12.4964 },
      locations: [
        { name: 'Colosseo', coordinates: { lat: 41.8902, lng: 12.4923 } },
        { name: 'Vaticano', coordinates: { lat: 41.9029, lng: 12.4534 } },
      ]
    },
    {
      name: 'Milano',
      coordinates: { lat: 45.4642, lng: 9.1900 },
      locations: [
        { name: 'Duomo di Milano', coordinates: { lat: 45.4641, lng: 9.1915 } },
        { name: 'Castello Sforzesco', coordinates: { lat: 45.4719, lng: 9.1800 } },
      ]
    },
    {
      name: 'Cosenza',
      coordinates: { lat: 39.3030, lng: 16.2500 },
      locations: [
        { name: 'Piazza Bilotti', coordinates: { lat: 39.3020, lng: 16.2530 } },
        { name: 'Museo di Cosenza', coordinates: { lat: 39.3035, lng: 16.2485 } },
      ]
    }
  ];

  center: LatLngLiteral = { lat: 41.9028, lng: 12.4964 };
  zoom: number = 12;

  constructor(public dialog: MatDialog) {}

  openSelectDialog(templateRef: TemplateRef<any>, selectedField: 'selectedImmobili' | 'selectedAffittoVendita' | 'selectedLuogo') {
    const dialogRef: MatDialogRef<any> = this.dialog.open(templateRef, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this[selectedField] = result;
      }
    });
  }

  selectOption(dialogRef: MatDialogRef<any>, option: string) {
    dialogRef.close(option);
  }

  selectLuogo(dialogRef: MatDialogRef<any>, option: string, coordinates: LatLngLiteral) {
    this.selectedLuogo = option;
    this.center = coordinates;
    dialogRef.close(option);
  }

  openMap(templateRef: TemplateRef<any>, selectedField: 'selectedLuogo') {
    const dialogRef: MatDialogRef<any> = this.dialog.open(templateRef, {
      width: '800px',
      height: '800px',
    });
  }

  onMouseEnter(city: any) {
    if (city.locations && Array.isArray(city.locations)) {
      this.hoveredCity = city.name;
      this.center = city.coordinates;
      this.markers = city.locations.map((location: Location) => ({
        name: location.name,
        coordinates: location.coordinates
      }));
    }
  }


}
