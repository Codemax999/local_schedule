import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ResultsComponent } from './components/results/results.component';

const appRoutes: Routes = [
  { path: 'results', component: ResultsComponent },
  { path: '', component: LandingComponent }
];

export const Routing = RouterModule.forRoot(appRoutes);