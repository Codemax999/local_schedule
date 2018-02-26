import { Injectable } from '@angular/core';

@Injectable()
export class CityService {

  // --- Service Variables ---
  _city: string = '';


  // --- Update City ---
  // get
  get city(): string { 

    return this._city; 
  }

  // set
  set city(currentCity: string) { 

    this._city = currentCity; 
  }
}
