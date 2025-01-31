import { Component } from '@angular/core';

@Component({
  selector: 'app-annunci',
  standalone: false,
  templateUrl: './annunci.component.html',
  styleUrls: ['./annunci.component.css'] // Nota: il nome corretto è style**s**Url
})
export class AnnunciComponent {
  immobili: Immobile[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.service.getImmobiliObservable().subscribe(data => {
      this.immobili = data;
    });
  }

}
