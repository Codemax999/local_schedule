import { Component } from '@angular/core';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // --- Constructor ---
  constructor(public currentCity: CityService) { }


  // --- Show / Hide Header Search Bar ---
  // if on results page
  searchBar(): boolean {

    if (window.location.pathname === '/results') return true;
    else return false;
  }


  // --- Reset City ---
  resetCity(): void {

    this.currentCity.city = '';
  }
}
