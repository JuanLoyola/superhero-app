import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperheroListComponent } from './components/superhero-list/superhero-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SuperheroListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'superhero-app';
}
