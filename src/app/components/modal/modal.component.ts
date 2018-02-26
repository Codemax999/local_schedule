import { Component, Input } from '@angular/core';
import { Schedule } from '../../interfaces/schedule';
import { TimelineComponent } from '../../components/timeline/timeline.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  // --- Component Variables ---
  @Input() modalName: string;
  @Input() modalPlace: string;
  @Input() modalSchedule: Array<Schedule>;


  // --- Modal Handler ---
  // show
  showModal(): void {

    document.querySelector('.modal').classList.add('active');
  }

  // close
  closeModal(): void {

    document.querySelector('.modal').classList.remove('active');
  }
}
