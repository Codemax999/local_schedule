import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 

  // --- Add Padding if Search Bar is at top ---
  searchBar(): boolean {

    if (window.location.pathname === '/results') return true;
    else return false;
  }
}
