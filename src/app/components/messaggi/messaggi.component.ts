import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-messaggi',
  standalone: false,

  templateUrl: './messaggi.component.html',
  styleUrl: './messaggi.component.css'
})
export class MessaggiComponent implements OnInit {
  constructor(private service: ServiceService) {}

  messages: any[] = [];

  ngOnInit() {
    // Controllo se ci sono dati salvati in LocalStorage
    const cachedMessaggi = localStorage.getItem('messaggi');
    if (cachedMessaggi) {
      this.messages = JSON.parse(cachedMessaggi);
      console.log('Dati caricati da LocalStorage:', this.messages);
    }

    this.service.getMessaggiObservable().subscribe(data => {
      console.log('Dati ricevuti dal backend:', data);

      if (data && data.length > 0) {
        this.messages = data;
        localStorage.setItem('messaggi', JSON.stringify(this.messages));
        console.log('Dati salvati in LocalStorage:', localStorage.getItem('messaggi'));
      }
    });
  }

  toggleExpand(message: any) {
    message.expanded = !message.expanded;
  }

  deleteMessage(index: number) {
    this.messages.splice(index, 1);
  }
}




