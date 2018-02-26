import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app.routes';

import { AppComponent } from './app.component';

import { GoogleService } from './services/google.service';
import { FacebookService } from './services/facebook.service';
import { CityService } from './services/city.service';

import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ResultsComponent } from './components/results/results.component';
import { CitiesComponent } from './components/cities/cities.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { VenuesComponent } from './components/venues/venues.component';
import { SearchComponent } from './components/search/search.component';
import { ModalComponent } from './components/modal/modal.component';
import { EmptyComponent } from './components/empty/empty.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ResultsComponent,
    CitiesComponent,
    TimelineComponent,
    VenuesComponent,
    SearchComponent,
    ModalComponent,
    EmptyComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    Routing
  ],
  providers: [
    GoogleService,
    FacebookService,
    CityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
