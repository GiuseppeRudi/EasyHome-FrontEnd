import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';  // Importa il componente Home
import { AboutComponent } from './components/about/about.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AnnunciComponent} from './components/annunci/annunci.component';
import {AggiungiComponent} from './components/aggiungi/aggiungi.component';
import {AdminpageComponent} from './components/adminpage/adminpage.component';
import {RecensioneComponent} from './components/recensione/recensione.component';
import {AsteComponent} from './components/aste/aste.component';
import {ContattavenditoreComponent} from './components/contattavenditore/contattavenditore.component';
import {ErrorpageComponent} from './components/errorpage/errorpage.component';
import {authGuard} from './auth/auth.guard';
import {AuthComponent} from './components/auth/auth.component';
import {MessaggiComponent} from './components/messaggi/messaggi.component';
import {AnnuncioDettaglioComponent} from './components/annunci/annuncio-dettaglio/annuncio-dettaglio.component';
import {UserRole} from './auth/user-role';
import {CookiesComponent} from './components/cookies/cookies.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TerminiecondizioniComponent} from './components/terminiecondizioni/terminiecondizioni.component';
import {ModificaComponent} from './components/modifica/modifica.component';
import {ModificaDettaglioComponent} from './components/modifica/modifica-dettaglio/modifica-dettaglio.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // La home page
  { path: 'about', component: AboutComponent },  // Pagina About
  { path: 'contacts', component: ContactsComponent },  //pagina contatti
  { path: 'annunci', component: AnnunciComponent },
  { path: 'aggiungi_annuncio', component: AggiungiComponent, canActivate :[authGuard], data: { type: ["venditore"] } },
  { path: 'modifica', component: ModificaComponent, canActivate :[authGuard], data: { type: ["venditore"] } },
  { path: 'login', component: AuthComponent },
  { path: 'messaggi', component: MessaggiComponent, canActivate :[authGuard], data: { type: ["venditore"] } },
  { path: 'cookies', component: CookiesComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'termini', component: TerminiecondizioniComponent },
  { path: 'admin', component:  AdminpageComponent, canActivate :[authGuard] , data: { requiredRoles: [UserRole.ADMIN] }},
  { path: 'recensione', component:  RecensioneComponent},
  { path: 'aste', component:  AsteComponent},
  { path: 'contattavenditore', component:  ContattavenditoreComponent, canActivate :[authGuard], data: { type: ["acquirente"] }},
  { path: '403', component: ErrorpageComponent, data: { errorCode: 403 } },
  { path: '***', component: ErrorpageComponent, data: { errorCode: 404 } },
  { path: 'annunci/:id', component: AnnuncioDettaglioComponent, canActivate :[authGuard], data: { type: ["acquirente"] }},
  { path: 'modifica-dettaglio/:id', component: ModificaDettaglioComponent, canActivate :[authGuard] },
  { path: '**', component: ErrorpageComponent, data: { errorCode: 404 } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura il RouterModule con le rotte
  exports: [RouterModule]  // Esporta il RouterModule
})
export class AppRoutingModule { }
