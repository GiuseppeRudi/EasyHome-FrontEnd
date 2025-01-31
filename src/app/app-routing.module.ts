import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';  // Importa il componente Home
import { AboutComponent } from './components/about/about.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AnnunciComponent} from './components/annunci/annunci.component';
import {AggiungiComponent} from './components/aggiungi/aggiungi.component';
import {AdminpageComponent} from './components/adminpage/adminpage.component';
import {RecensioneComponent} from './components/recensione/recensione.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // La home page
  { path: 'about', component: AboutComponent },  // Pagina About
  { path: 'contacts', component: ContactsComponent },  //pagina contatti
  { path: 'annunci', component: AnnunciComponent },
  { path: 'aggiungi_annuncio', component: AggiungiComponent },
  { path: 'admin', component:  AdminpageComponent},
  { path: 'recensione', component:  RecensioneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura il RouterModule con le rotte
  exports: [RouterModule]  // Esporta il RouterModule
})
export class AppRoutingModule { }
