import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Venue } from '../../interfaces/venue';
import { Schedule } from '../../interfaces/schedule';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent {

  // --- Component Variables ---
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  @Input() venues: Array<Venue>;
  @Input() schedule: Array<Schedule>;
  modalSchedule: Array<Schedule> = [];
  modalName: string = '';
  modalPlace: string = '';


  // --- Update Data Badges ---
  dataLoaded(): void {

    // get badge
    this.venues.map(x => {

      const badge = document.querySelector(`#venue-${x.id}`);
      if (badge) badge.setAttribute('data-badge', x.eventCount);
    });

    // animate in
    document.querySelector('.venues-container').classList.add('burst');
  }


  // --- Filter Schedule for Modals ---
  showModal(eventDetails: Event): void {

    // Filter Schedule by Place ID
    let venueDates = [];
    this.schedule.map((x, i) => {

      const newItem = <Schedule> {
        date: x.date,
        events: x.events.filter(subEvent => subEvent.place.id === eventDetails.id)
      };

      // if events exist add to array
      if (newItem.events.length > 0) venueDates = [...venueDates, newItem];

      // after full schedule loop finishes, update dom
      if (i === this.schedule.length - 1) {

        this.modalName = eventDetails.name;
        this.modalPlace = venueDates.length > 0 ? venueDates[0].events[0].place.location.street : '';
        this.modalSchedule = venueDates;
      }
    });

    // display modal
    this.modalComponent.showModal();
  }
}
