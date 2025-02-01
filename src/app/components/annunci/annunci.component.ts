import {Component, OnInit} from '@angular/core';
import {Immobile} from '../../model/Immobile';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-annunci',
  standalone: false,
  templateUrl: './annunci.component.html',
  styleUrls: ['./annunci.component.css'] // Nota: il nome corretto è style**s**Url
})
export class AnnunciComponent  implements  OnInit{
  immobili: Immobile[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.service.getImmobiliObservable().subscribe(data => {
      this.immobili = data;
    });
  }

}
