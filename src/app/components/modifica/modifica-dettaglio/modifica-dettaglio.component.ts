import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service/service.service';

@Component({
  selector: 'app-modifica-dettaglio',
  templateUrl: './modifica-dettaglio.component.html',
  styleUrls: ['./modifica-dettaglio.component.css'],
  standalone: false
})
export class ModificaDettaglioComponent {
  modificaForm: FormGroup;
  immobileId: number | null = null;
  immobileDetails: any;
  fotoFiles: File[] = [];
  username: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService
  ) {
    this.modificaForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      tipo: [''],
      descrizione: [''],
      categoria: [''],
      prezzo: [null, [Validators.required, Validators.min(1)]],
      mq: [null, [Validators.required, Validators.min(1)]],
      camere: [null, [Validators.min(0)]],
      bagni: [null, [Validators.min(0)]],
      anno: [null],
      etichetta: [''],
      provincia: [''],
      latitudine: [null],
      longitudine: [null]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.immobileId = Number(params.get('id'));
      console.log('ID immobile ricevuto:', this.immobileId);

      // Chiama il servizio per ottenere i dettagli dell'immobile
      this.service.getImmobileById(this.immobileId).subscribe((data) => {
        console.log(data);
        this.immobileDetails = data;
        this.modificaForm.patchValue(this.immobileDetails);
      });
    });
  }

  // Metodo per la modifica dell'annuncio
  modificaAnnuncio() {
    if (this.modificaForm.valid) {
      const formData = new FormData();

      // Aggiungi i dati del form
      formData.append('nome', this.modificaForm.get('nome')?.value);
      formData.append('tipo', this.modificaForm.get('tipo')?.value);
      formData.append('descrizione', this.modificaForm.get('descrizione')?.value);
      formData.append('categoria', this.modificaForm.get('categoria')?.value);
      formData.append('prezzo', this.modificaForm.get('prezzo')?.value.toString());
      formData.append('mq', this.modificaForm.get('mq')?.value.toString());
      formData.append('camere', this.modificaForm.get('camere')?.value.toString());
      formData.append('bagni', this.modificaForm.get('bagni')?.value.toString());
      formData.append('anno', this.modificaForm.get('anno')?.value.toString());
      formData.append('etichetta', this.modificaForm.get('etichetta')?.value);
      formData.append('latitudine', this.modificaForm.get('latitudine')?.value);
      formData.append('longitudine', this.modificaForm.get('longitudine')?.value);
      formData.append('provincia', this.modificaForm.get('provincia')?.value);

      // Recupera l'username dalla sessione
      this.username = sessionStorage.getItem('username');
      if (this.username) {
        formData.append('user', this.username);
      }

      // Aggiungi le immagini se ci sono
      if (this.fotoFiles.length > 0) {
        this.fotoFiles.forEach(file => {
          formData.append('foto', file, file.name);
        });
      }

      // Invio dei dati al backend per aggiornare l'immobile
      this.service.updateImmobile(this.immobileId!, formData).subscribe({
        next: () => {
          alert('Annuncio modificato con successo!');
          this.router.navigate(['/']);  // Ritorna alla lista degli annunci
        },
        error: (error) => {
          console.error('Errore:', error);
          alert('Errore durante la modifica dell\'annuncio.');
        }
      });
    } else {
      alert('Per favore, completa tutti i campi.');
    }
  }

  // Gestione file selezionati per l'immagine
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fotoFiles = Array.from(input.files);
    }
  }

  getImageSrc(imagePath: string): string {
    console.log(imagePath)
    return this.service.getImageSrc(imagePath);
  }

}
