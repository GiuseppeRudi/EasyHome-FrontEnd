import {Component, OnInit, TemplateRef} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ServiceService } from '../../service/service.service';

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
export class HomeComponent implements  OnInit{
  selectedImmobili: string | null = 'Tipo';
  selectedAffittoVendita: string | null = 'Categoria';
  selectedLuogo: string | null = 'Provincia';

  zoom=14;
  center = { lat: 39.3042, lng: 16.2503 }; // Coordinate di Cosenza// Coordinate di Cosenza

  markers: any[] = [];
  filteredMarkers: any[] = []; // Marker filtrati in base al luogo selezionato
  places: {
    name: string;
    zoom: number;
    coordinates: LatLngLiteral;
  }[] = [
    { name: 'Tutte', zoom:8, coordinates: { lat: 38.500, lng: 16.000 } },
    { name: 'Cosenza', zoom:12,coordinates: { lat: 39.305, lng: 16.250 } },
    { name: 'Catanzaro',zoom:12, coordinates: { lat: 38.9092366, lng: 16.585428 } },
    { name: 'Reggio Calabria',zoom:12 ,coordinates: { lat: 38.110, lng: 15.650 } },
    { name: 'Vibo Valentia',zoom:12, coordinates: { lat: 38.679, lng: 16.108 } },
    { name: 'Crotone',zoom:12, coordinates: { lat: 39.083, lng: 17.133 } },
  ];


  constructor(public dialog: MatDialog, private service: ServiceService, private router: Router) {}

  // Apre il dialog per selezionare un campo (Tipo Immobile, Tipo Annuncio, Luogo)
  openSelectDialog(templateRef: TemplateRef<any>, selectedField: 'selectedImmobili' | 'selectedAffittoVendita' | 'selectedLuogo') {
    const dialogRef: MatDialogRef<any> = this.dialog.open(templateRef, {
      width: '100px',
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
  selectedLuogoTemp: string | null = null;

  selectLuogo(option: string, cityCoordinates: LatLngLiteral,zoom: number) {
    this.selectedLuogoTemp = option;
    this.center = cityCoordinates;
    this.zoom = zoom;
    this.filterMarkers(option);
  }

  confirmSelection(dialogRef: MatDialogRef<any>) {
    this.selectedLuogo = this.selectedLuogoTemp;
    dialogRef.close();
  }


  filterMarkers(cityName: string) {
    if (cityName !== '') {
      this.filteredMarkers = this.markers; // Mostra tutti i marker
    } else {
      this.filteredMarkers = this.markers.filter(marker => marker.city === cityName); // Filtra per città
    }
  }

  // Funzione per aprire la mappa in un dialog
  openMap(templateRef: TemplateRef<any>, selectedField: 'selectedLuogo') {
    this.dialog.open(templateRef, {
      width: '800px'
    });
  }




  // Controlla che la selezione sia completa
  isSelectionComplete(): boolean {
    return (
      this.selectedImmobili !== 'Tipo' &&
      this.selectedAffittoVendita !== 'Categoria' &&
      this.selectedLuogo !== 'Provincia'
    );
  }
  seeResults(): void {
    this.service.getImmobiliMinimal(this.selectedImmobili, this.selectedAffittoVendita, this.selectedLuogo);
    this.router.navigate(['/annunci']); // Naviga direttamente
  }

  ngOnInit(): void {
    this.loadMarkers();
    this.selectLuogo(this.places[0].name,this.places[0].coordinates,this.places[0].zoom)
  }

  loadMarkers(): void {
    this.service.getMarkers().subscribe({
      next: (data: any) => {
        console.log(data);

        // Map the response to a format that Google Maps can understand
        this.markers = data.map((marker: { lat: number; lng: number }) => ({
          coordinates: { lat: marker.lat, lng: marker.lng }
        }));
        this.filteredMarkers = this.markers;
      },
      error: (err) => {
        console.error('Errore nel recupero dei marker:', err);
      }
    });
  }

}
