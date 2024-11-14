import { Routes } from '@angular/router';
import { SuperheroListComponent } from './components/superhero-list/superhero-list.component';
import { SuperheroDetailComponent } from './components/superhero-detail/superhero-detail.component';

export const routes: Routes = [
    { path: '', component: SuperheroListComponent }, // default
    { path: 'filter-by-name/:name', component: SuperheroListComponent },
    { path: 'superhero/:id', component: SuperheroDetailComponent },
];
