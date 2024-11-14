import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { SuperheroService } from '../../services/superhero.service'
import { Superhero } from '../../models/superheroes.models'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule } from '@angular/material/paginator'
import { FormBuilder, FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { ModalAdd } from '../modal-add/modal-add.component'


@Component({
  selector: 'app-superhero-list',
  templateUrl: './superhero-list.component.html',
  styleUrls: ['./superhero-list.component.css'],
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    ModalAdd
  ]
})
export class SuperheroListComponent implements OnInit {
  superheroes: Superhero[] = []
  filteredSuperheroes: Superhero[] = []
  searchTerm: string = ''
  currentPage: number = 1
  itemsPerPage: number = 5

  // @Output() onAdd = new EventEmitter<void>()
  openModalAdd = false

  // private _formBuilder = inject(FormBuilder)
  private superheroService = inject(SuperheroService)

  ngOnInit(): void {
    // this.superheroService.getAllSuperheroes().subscribe(heroes => {
    //   this.superheroes = heroes

    //   this.filteredSuperheroes = heroes
    // })
    this.getAll()
  }

  getAll() {
    this.superheroService.getAllSuperheroes().subscribe(heroes => {
      this.superheroes = heroes

      this.filteredSuperheroes = heroes
    })
  }

  handlePageChange(page: number): void {
    this.currentPage = page
  }

  handleEdit(superhero: Superhero): void {
    console.log('Edit clicked')
    this.superheroService.editSuperhero(superhero)
  }

  handleDelete(superhero: Superhero): void {
    this.superheroService.deleteSuperhero(superhero.id)
  }

  filterSuperheroes(): void {
    const searchTermLower = this.searchTerm.toLowerCase()

    this.filteredSuperheroes = this.superheroes.filter(hero => {
      return ['name', 'description', 'id'].some(field =>
        (hero as any)[field]?.toString().toLowerCase().includes(searchTermLower)
      )
    })
  }

  handleAdd() {
    this.openModalAdd = !this.openModalAdd
  }

  onHeroAdded(newHero: Superhero): void {
    this.superheroes.push(newHero);
    this.filteredSuperheroes = [...this.superheroes];

    this.openModalAdd = false;
  }
}