import { Component, Input } from '@angular/core';
import { Schedule } from '../../interfaces/schedule';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  // --- Component Variables ---
  @Input() schedule: Array<Schedule>;


  // --- Data Loaded ---
  //animate in 
  dataLoaded(): void {

    const timeline = document.querySelector('.timeline');
    timeline.classList.add('timeline-initial');
    timeline.classList.add('burst');
    setTimeout(() => timeline.classList.remove('timeline-initial'), 300);
  }
}
