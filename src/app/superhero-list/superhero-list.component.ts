import { Component, OnInit } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superheroes.models';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-superhero-list',
  templateUrl: './superhero-list.component.html',
  styleUrls: ['./superhero-list.component.css'],
  standalone: true,
  imports:[MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
  MatIconModule
]
})
export class SuperheroListComponent implements OnInit {
  superheroes: Superhero[] = [];
  filteredSuperheroes: Superhero[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  showAddModal = false

  constructor(private superheroService: SuperheroService) {}

  ngOnInit(): void {
    this.superheroService.getAllSuperheroes().subscribe(heroes => {
      this.superheroes = heroes;

      this.filteredSuperheroes = heroes;
    });
  }

  handlePageChange(page: number): void {
    this.currentPage = page;
  }

  handleAdd(): void {
    this.showAddModal = !this.showAddModal
  }

  handleEdit(superhero: Superhero): void {
    console.log('Edit clicked')
    this.superheroService.editSuperhero(superhero);
  }

  handleDelete(superhero: Superhero): void {
    console.log('Delete clicked')
    this.superheroService.deleteSuperhero(superhero.id);
  }

  filterSuperheroes(): void {
  const searchTermLower = this.searchTerm.toLowerCase();

  this.filteredSuperheroes = this.superheroes.filter(hero => {
    return ['name', 'description', 'id'].some(field =>
      (hero as any)[field]?.toString().toLowerCase().includes(searchTermLower)
    );
  });
}

}