import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperheroListComponent } from './components/superhero-list/superhero-list.component';
import { ModalAdd } from './components/modal-add/modal-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SuperheroListComponent, ModalAdd],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'superhero-app';
  openModalAdd: boolean = false

  handleAdd() {
    this.openModalAdd = true
  }
}
