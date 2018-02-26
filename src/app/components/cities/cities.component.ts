import { Component } from '@angular/core';
import { City } from '../../interfaces/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent { 

  // --- Component Variables ---
  cities: Array<City> = [];


  // --- Constructor ---
  constructor(public currentCity: CityService) { }


  // --- LifeCycle ---
  ngOnInit() {
    
    // add cities and images to cities array
    const cityNames = [
      'Wynwood', 
      'Austin', 
      'West Palm Beach', 
      'Portland', 
      'Sydney',
      'Vancouver',
      'San Jose',
    ];
    
    const cityImgPaths = [
      'assets/city/wynwood.jpg',
      'assets/city/austin.jpg',
      'assets/city/west_palm.jpg',
      'assets/city/portland.jpg',
      'assets/city/sydney.jpg',
      'assets/city/vancouver.jpg',
      'assets/city/san_jose.jpg',
    ];

    cityNames.map((x, i) => {

      const newCity = <City> {
        name: x,
        img: cityImgPaths[i]
      };

      this.cities = [...this.cities, newCity];
    });    
  }


  // --- Set City to placeholder ---
  setCity(city: string): void {

    this.currentCity.city = city;
  }
}
