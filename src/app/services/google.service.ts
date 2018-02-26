import { Injectable } from '@angular/core';

@Injectable()
export class GoogleService {
  
  // --- City to Lat Lng ---
  geoLocate = (city: string): Promise<Array<number>> => {

    return new Promise((resolve, reject) => {

      // geocoder using address for lat lng
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': city }, (results, status) => {

        if (String(status) === 'OK') {

          // new address point lat lng and city
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          resolve([lat, lng]);

        } else reject('Unable to find location');
      });
    });
  }
}
