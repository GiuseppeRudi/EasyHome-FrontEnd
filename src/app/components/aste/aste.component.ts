import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aste',
  templateUrl: './aste.component.html',
  styleUrls: ['./aste.component.css'],
  standalone:false
})
export class AsteComponent implements OnInit {
  auctions: any[] = []; // Dati delle aste

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
