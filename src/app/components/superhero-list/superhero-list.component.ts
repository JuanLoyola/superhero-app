import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superheroes.models';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ModalAdd } from '../modal-add/modal-add.component';
import { ModalEdit } from '../modal-add copy/modal-edit.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
	selector: 'app-superhero-list',
	templateUrl: './superhero-list.component.html',
	styleUrls: ['./superhero-list.component.css'],
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatButtonModule,
		MatPaginatorModule,
		FormsModule,
		MatIconModule,
		ModalAdd,
		ModalEdit,
		ConfirmComponent,
	],
})
export class SuperheroListComponent implements OnInit {
	superheroes: Superhero[] = [];
	filteredSuperheroes: Superhero[] = [];
	searchTerm: string = '';
	currentPage: number = 0;
	itemsPerPage: number = 5;

	openModalAdd = false;
	openModalEdit = false;
	showConfirm = false;

	selectedHero!: Superhero;

	private superheroService = inject(SuperheroService);

	get paginatedSuperheroes(): Superhero[] {
		const startIndex = this.currentPage * this.itemsPerPage;

		return this.filteredSuperheroes.slice(startIndex, startIndex + this.itemsPerPage);
	}

	ngOnInit(): void {
		this.getAll();
	}

	getAll() {
		this.superheroService.getAllSuperheroes().subscribe((heroes) => {
			this.superheroes = heroes;

			this.filteredSuperheroes = heroes;
		});
	}

	handlePageChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.itemsPerPage = event.pageSize;
	}

	filterSuperheroes(): void {
		const searchTermLower = this.searchTerm.toLowerCase();

		this.filteredSuperheroes = this.superheroes.filter((hero) => {
			return ['name', 'description', 'id'].some((field) =>
				(hero as any)[field]?.toString().toLowerCase().includes(searchTermLower)
			);
		});
	}

	handleAdd() {
		this.openModalAdd = !this.openModalAdd;
	}

	handleEdit(superhero: Superhero): void {
		console.log(superhero);
		this.openModalEdit = true;
		this.selectedHero = superhero;
	}

	showDeleteConfirm(hero?: Superhero) {
		if (hero) this.selectedHero = hero

		this.showConfirm = !this.showConfirm
	}

	handleDelete(superhero: Superhero): void {
		this.superheroService.deleteSuperhero(superhero.id);
		this.showConfirm = !this.showConfirm
	}

	onHeroAdded(newHero: Superhero): void {
		// TODO: esto deberia pushear a un array que tengamos en sessionStorage y luego traer esos items junto al nuevo
		this.superheroes.push(newHero);
		this.filteredSuperheroes = [...this.superheroes];

		this.openModalAdd = false;
	}

	onHeroEdited(editedHero: Superhero): void {
		const index = this.superheroes.findIndex(
			(hero) => hero.id === editedHero.id
		);
		if (index !== -1) {
			this.superheroes[index] = editedHero;
			this.filteredSuperheroes = [...this.superheroes];
		}
		this.openModalEdit = false;
	}
}
