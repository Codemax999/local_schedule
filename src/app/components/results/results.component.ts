import { Component, ViewChild } from '@angular/core';
import { VenuesComponent } from '../../components/venues/venues.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { ActivatedRoute } from "@angular/router";
import { GoogleService } from '../../services/google.service';
import { FacebookService } from '../../services/facebook.service';
import { Event } from '../../interfaces/event';
import { Venue } from '../../interfaces/venue';
import { Schedule } from '../../interfaces/schedule';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  // --- Component Variables ---
  @ViewChild(VenuesComponent) venuesComponent: VenuesComponent;
  @ViewChild(TimelineComponent) timelineComponent: TimelineComponent;
  displayLoading: boolean = false;
  noEvents: boolean = false;
  schedule: Array<Schedule> = [];
  venues: Array<Venue> = [];
  
  
  // --- Constructor ---
  constructor(
    public route: ActivatedRoute,
    public google: GoogleService,
    public facebook: FacebookService) {

    // search city
    this.route.queryParams.subscribe(params => this.getSchedule(params.city));
  }


  // --- Get Schedule ---
  getSchedule(city: string): void {

    // scroll to top
    window.scrollTo(0,0);

    // reset no events and display loading
    this.noEvents = false;
    this.displayLoading = true;

    // get venues, for each get events
    this.google.geoLocate(city)
      .then(this.facebook.getVenues)
      .then(this.facebook.buildEventPaths)
      .then(this.facebook.getAllEvents)
      .then(this.facebook.sortEvents)
      .then(this.facebook.sortVenues)
      .then(payload => {

        // hide loading
        this.displayLoading = false;

        // no events: show local venues
        if (!payload.allEvents.length) this.noEvents = true;

        // update arrays
        this.schedule = payload.schedule;
        this.venues = payload.venues;

        // data loaded
        setTimeout(() => {

          this.venuesComponent.dataLoaded();
          this.timelineComponent.dataLoaded();
        }, 100);
      })
      .catch(() => {

        // location not found
        this.displayLoading = false;
      });
  }
}
