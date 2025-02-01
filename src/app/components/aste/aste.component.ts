import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aste',
  templateUrl: './aste.component.html',
  styleUrls: ['./aste.component.css'],
  standalone:false
})
export class AsteComponent implements OnInit {

  auctions = [
    {
      id: 1,
      title: 'Villa sul Mare',
      location: 'Calabria, Italia',
      image: 'https://via.placeholder.com/300x200?text=Villa+Mare',
      description: 'Una bellissima villa fronte mare, con giardino e piscina.',
      oldPrice: 800000,
      currentPrice: 750000,
    },
    {
      id: 2,
      title: 'Appartamento in Città',
      location: 'Cosenza, Italia',
      image: 'https://via.placeholder.com/300x200?text=Appartamento+In+Città',
      description: 'Appartamento moderno nel centro di Cosenza, con 3 camere e 2 bagni.',
      oldPrice: 300000,
      currentPrice: 290000,
    },
    {
      id: 3,
      title: 'Rustico in Montagna',
      location: 'Sila, Calabria',
      image: 'https://via.placeholder.com/300x200?text=Rustico+Montagna',
      description: 'Rustico in montagna, ideale per gli amanti della natura e della tranquillità.',
      oldPrice: 120000,
      currentPrice: 115000,
    }
  ];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Recupera i dati delle aste dal backend
    this.getAuctions();
  }

  getAuctions(): void {
    this.http.get<any[]>('http://your-backend-api/open/aste').subscribe((data) => {
      this.auctions = data;
    });
  }

  placeBid(auction: any): void {
    const bidData = {
      auctionId: auction.id,
      currentBid: auction.currentPrice,
    };


    this.http.post('http://your-backend-api/open/aste', bidData).subscribe(
      (response) => {
        console.log('Asta partecipata', response);
        alert('Hai partecipato all\'asta!');
      },
      (error) => {
        console.error('Errore durante l\'invio dei dati', error);
        alert('Errore nel partecipare all\'asta');
      }
    );
  }
}
