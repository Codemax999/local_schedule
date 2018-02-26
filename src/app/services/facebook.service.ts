import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FacebookResponse } from '../interfaces/facebook-response';
import { VenuePagination } from '../interfaces/venue-pagination';
import { Schedule } from '../interfaces/schedule';
import { Place } from '../interfaces/place';

@Injectable()
export class FacebookService {

  // --- Constructor ---
  constructor(public http: Http) { }


  // --- Venues near lat lng ---
  // lat lng generated by google.service.ts
  getVenues = (latlng: Array<number>): Promise<FacebookResponse> => {

    return new Promise(resolve => {

      // query details
      const center = `${String(latlng[0])},${String(latlng[1])}`;
      const key = '535769779959865|yC4RI-mpARKdAHG9gS9LILDhwI8';
      const distance = 4023.36;
      const categories = 'ARTS_ENTERTAINMENT';
      const fields = 'name, category_list';
      const path = `https://graph.facebook.com/v2.11/search?type=place&center=${center}&distance=${distance}&fields=${fields}&access_token=${key}`;

      // all venues placeholder
      let venues = [];
      let counter = 0;

      const requestData = (url: string) => {

        this.venueApi(url)
          .then(res => {

            // add venues
            if (res.venues) res.venues.map(x => venues = [...venues, x]);

            // increase counter and run api request on next path
            if (res.nextPath.length) {

              counter++;
              requestData(res.nextPath);
            }

            // create new facebook response and return all venues
            if (!res.nextPath.length || counter === 8) {

              const newRes = <FacebookResponse> {
                venues: venues
              };

              resolve(newRes);
            }
          });
      }

      // start data loop
      requestData(path);
    });
  }

  // venue api
  venueApi = (path: string): Promise<VenuePagination> => {

    return new Promise(resolve => {

      // venue names placeholder
      let venues = [];

      // get venues
      this.http.get(path).subscribe(res => {

        // for each venue get events
        const venue = res.json().data;
        venue.map((x, i) => {

          // Page Categories
          const verifyType = [
            'Live Music Venue',
            'Dance & Night Club',
            'Bar',
            'Lounge',
            'Cocktail Bar'
          ];

          // get all events if venue is correct category
          const verify = x.category_list.map(category => verifyType.includes(category.name));
          if (verify.includes(true)) {

            // add images to venues
            const venueImages = [
              'assets/venue/live_music.jpg',
              'assets/venue/club.jpg',
              'assets/venue/bar.jpg',
              'assets/venue/lounge.jpg',
              'assets/venue/lounge.jpg'
            ];

            x.img = venueImages[verify.indexOf(true)];
            venues = [...venues, x];
          }

          // return
          if (i === venue.length - 1) {

            const data = <VenuePagination> {
              venues: venues,
              nextPath: res.json().paging ? res.json().paging.next : ''
            };

            resolve(data);
          }
        });
      });
    });
  }


  // --- Venues Events ---
  // paths to all local pages events
  buildEventPaths = (payload: FacebookResponse): Promise<FacebookResponse> => {

    return new Promise(resolve => {

      // event urls placeholder
      let eventPaths = [];

      // loop venues
      payload.venues.map((x, i) => {

        // page event path
        const time = 'upcoming';
        const key = '535769779959865|yC4RI-mpARKdAHG9gS9LILDhwI8';
        const eventPath = `https://graph.facebook.com/v2.11/${x.id}/events?include_canceled=${false}&time_filter=${time}&access_token=${key}`;
        eventPaths = [...eventPaths, eventPath];

        // return 
        if (i === payload.venues.length - 1) {

          payload.eventPaths = eventPaths;
          resolve(payload);
        }
      });
    });
  }

  // events from paths
  getAllEvents = (payload: FacebookResponse): Promise<FacebookResponse> => {

    return new Promise(resolve => {

      // all events placeholder and counter
      let allEvents = [];
      let counter = 1;

      // loop for each venue and get list of events
      payload.eventPaths.map(x => {

        this.http.get(x).subscribe(eventRes => {

          // validate for data and add to array
          const events = eventRes.json().data;
          if (events.length > 0) events.map(ev => allEvents = [...allEvents, ev]);

          // update counter and return payload
          if (counter !== payload.eventPaths.length) counter++;
          else {

            payload.allEvents = allEvents;
            resolve(payload);
          }
        });
      });
    });
  }

  // sort events
  sortEvents(payload: FacebookResponse): Promise<FacebookResponse> {

    return new Promise(resolve => {

      // full schedule placeholder
      let fullSchedule = [];

      // return if no events
      if (!payload.allEvents.length) {

        payload.schedule = fullSchedule;
        return resolve(payload);
      }

      // map of events by key of event start
      let scheduleMap = new Map();

      // filter for any past dates or duplicates
      const currentMilli = moment().valueOf();
      const filterTime = payload.allEvents.filter(x => currentMilli <= moment(x.start_time).valueOf());
      const dedupeEvents = Array.from(filterTime.reduce((a, b) => a.set(b.id, b), new Map()).values());
      dedupeEvents.map((x, i) => {

        // create timestamp for day of event to be used with Map
        const startDate = moment(x.start_time).startOf('day').valueOf();

        // if timestamp key already exists update array, else set initial key
        if (scheduleMap.has(startDate)) {

          let prev = Array.from(scheduleMap.get(startDate));
          scheduleMap.set(startDate, [...prev, x]);

        } else scheduleMap.set(startDate, [x]);

        // translate Map to array of schedule objects
        if (i === dedupeEvents.length - 1) {

          // sort and create schedule objects
          const convertSchedule = Array.from(scheduleMap).sort((a, b) => a[0] - b[0]);
          convertSchedule.map((item, index) => {

            const newSchedule = <Schedule> {
              date: item[0],
              events: item[1]
            };

            fullSchedule = [...fullSchedule, newSchedule];

            // add array schedule to Facebook reponse
            if (index === convertSchedule.length - 1) {

              payload.schedule = fullSchedule;
              resolve(payload);
            }
          });
        }
      });
    });
  }

  // add event count to venues 
  sortVenues(payload: FacebookResponse): Promise<FacebookResponse> {

    return new Promise(resolve => {

      payload.schedule.map((x, i) => {

        x.events.map(eventArr => {

          // add defaults for any event without place details
          eventArr.place = eventArr.place ? eventArr.place : <Place> { id: '0', name: 'No Name' };

          // get venue by id
          let venueUpdate = payload.venues.filter(venue => venue.id === eventArr.place.id);
          if (venueUpdate[0]) {
            
            // update venue to include venue count
            let prevCount = venueUpdate[0].eventCount ? venueUpdate[0].eventCount : 0;
            venueUpdate[0].eventCount = String(Number(prevCount) + 1);
          }
        });

        // sort venues by event count
        if (i === payload.schedule.length - 1) {

          payload.venues.map(venue => venue.eventCount = venue.eventCount === undefined ? '' : venue.eventCount);
          payload.venues = payload.venues.sort((a, b) => Number(b.eventCount) - Number(a.eventCount));
          resolve(payload);
        }
      });
    });
  }
}