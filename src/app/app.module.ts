import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';
import { GoogleMapsModule  } from '@angular/google-maps';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import {MatFormField} from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactsComponent } from './components/contacts/contacts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AnnunciComponent } from './components/annunci/annunci.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import { AggiungiComponent } from './components/aggiungi/aggiungi.component';
import {provideHttpClient} from "@angular/common/http";
import { AuthComponent } from './components/auth/auth.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    FooterComponent,
    MapComponent,
    ContactsComponent,
    AnnunciComponent,
    AggiungiComponent,
    AuthComponent,
    AdminpageComponent,
    ErrorpageComponent,


],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbar,
    MatDialogModule,
    MatIcon,
    NgOptimizedImage,
    GoogleMapsModule,
    MatFormField,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardContent,
    MatCard,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
