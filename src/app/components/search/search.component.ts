import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  // --- Component Variables ---
  form: FormGroup;
  city: string = '';


  // --- Constructor ---
  constructor(public currentCity: CityService) { }


  // --- LifeCycle ---
  ngOnInit() {

    // get stored last city
    this.city = this.currentCity.city;

    // initialize form 
    this.form = new FormGroup({
      city: new FormControl(this.city, Validators.maxLength(50))
    });
  }


  // --- Is Input in Header ---
  isHeader(): boolean {
    
    if (window.location.pathname === '/results') return true;
    else return false;
  }


  // --- Set City to placeholder ---
  setCity(city: string): void {

    this.currentCity.city = city;
  }
}
