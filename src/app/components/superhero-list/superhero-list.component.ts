import { Component, OnInit } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superheroes.models';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NoResults } from '../404/404.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalSuperhero } from '../modal-superhero/modal-superhero.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
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
		ConfirmComponent,
		ModalSuperhero,
		RouterLink,
		NoResults

	],
})
export class SuperheroListComponent implements OnInit {
	superheroes: Superhero[] = [];
	filteredSuperheroes: Superhero[] = [];
	searchTerm: string = '';
	searchID: string = '';
	currentPage: number = 0;
	itemsPerPage: number = 5;
	private searchTimeout: any;

	openModal = false;
	openModalEdit = false;
	showConfirm = false;

	selectedHero!: Superhero | null;

	loading: boolean = false;
	constructor(private superheroService: SuperheroService, private router: Router) { }

	get paginatedSuperheroes(): Superhero[] {
		const startIndex = this.currentPage * this.itemsPerPage;

		return this.filteredSuperheroes.slice(startIndex, startIndex + this.itemsPerPage);
	}

	ngOnInit(): void {
		this.superheroes = this.superheroService.getAllSuperheroes()();
		this.filteredSuperheroes = this.superheroes;
	}

	handleAdd(superhero?: Superhero): void {
		if (superhero) this.superheroService.addSuperhero(superhero);

		this.updateFilteredSuperheroes();
		this.handleModal('add')
	}

	handleEdit(superhero: Superhero): void {
		this.selectedHero = superhero

		this.updateFilteredSuperheroes();
		this.handleModal('edit')
	}

	handlePageChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.itemsPerPage = event.pageSize;
	}

	onSearchNameChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value;

		clearTimeout(this.searchTimeout);
		this.searchTimeout = setTimeout(() => {
			this.filterSuperheroes(value);
			console.log(value)
		}, 500);
	}

	onSearchIdChange(value: string): void {
		clearTimeout(this.searchTimeout);
		this.searchTimeout = setTimeout(() => {
			this.handleGetById(Number(value));
		}, 300);
	}

	filterSuperheroes(name?: string): void {
		const searchTermLower = name?.toLowerCase();

		this.filteredSuperheroes = this.superheroes.filter((hero) => {
			return ['name', 'description', 'id'].some((field) =>
				(hero as any)[field]?.toString().toLowerCase().includes(searchTermLower)
			);
		});

		if (this.filteredSuperheroes.length > 0) this.router.navigate(['/filter-by-name', name]);
		if (this.filteredSuperheroes.length === 0) this.searchTerm == '';
	}

	private updateFilteredSuperheroes(): void {
		this.superheroes = this.superheroService.getAllSuperheroes()(); // Call the signal to get the current value
		this.filterSuperheroes();
	}
	searchInTable(): void {
		const searchTermLower = this.searchTerm.toLowerCase();

		this.filteredSuperheroes = this.superheroes.filter((hero) => {
			return ['name', 'description', 'id'].some((field) =>
				(hero as any)[field]?.toString().toLowerCase().includes(searchTermLower)
			);
		});
	}

	handleGetById(id: number): void {
		this.router.navigate(['/superhero', id]);
	}


	showDeleteConfirm(hero?: Superhero) {
		if (hero) this.selectedHero = hero

		this.showConfirm = !this.showConfirm
	}

	onHeroAdded(newHero: Superhero): void {
		this.superheroes.push(newHero);
		this.filteredSuperheroes = [...this.superheroes];
		this.handleModal('add')
	}

	onHeroEdited(editedHero: Superhero): void {
		this.superheroService.editSuperhero(editedHero);
		this.handleModal('edit')
	}

	handleDelete(superhero: Superhero | null): void {
		if (superhero != null) this.superheroService.deleteSuperhero(superhero.id);

		this.showConfirm = !this.showConfirm
		this.updateFilteredSuperheroes();
	}

	handleModal(type: 'add' | 'edit'): void {
		if (type === 'edit') this.openModalEdit = !this.openModalEdit;

		this.openModal = !this.openModal;
	}

	resetInputs() {
		this.searchID = ''
		this.searchTerm = ''

		this.superheroes = this.superheroService.getAllSuperheroes()();
	}
}