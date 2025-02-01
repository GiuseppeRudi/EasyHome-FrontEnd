import { Component } from '@angular/core';

@Component({
  selector: 'app-messaggi',
  standalone: false,

  templateUrl: './messaggi.component.html',
  styleUrl: './messaggi.component.css'
})
export class MessaggiComponent {


  messages: any[] = [
    {
      title: 'Messaggio 1',
      username: 'utente1',
      propertyName: 'Villa Mare',
      description: 'Messaggio relativo alla villa',
      email: 'utente1@example.com',
      phone: '123456789',
      expanded: false
    },
    {
      title: 'Messaggio 2',
      username: 'utente2',
      propertyName: 'Appartamento Città',
      description: 'Messaggio relativo all\'appartamento',
      email: 'utente2@example.com',
      phone: '987654321',
      expanded: false
    }
    ];
  toggleExpand(message: any) {
    message.expanded = !message.expanded;
  }

  deleteMessage(index: number) {
    this.messages.splice(index, 1);
  }
}




