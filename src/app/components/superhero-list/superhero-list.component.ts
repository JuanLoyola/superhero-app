import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { LoadingService } from '../../services/loading.service';
import { Superhero } from '../../models/superheroes.models';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ModalSuperhero } from '../modal-superhero/modal-superhero.component';

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
		ModalSuperhero
	],
})
export class SuperheroListComponent implements OnInit {
	superheroes: Superhero[] = [];
	filteredSuperheroes: Superhero[] = [];
	searchTerm: string = '';
	currentPage: number = 0;
	itemsPerPage: number = 5;

	openModal = false;
	openModalEdit = false;
	showConfirm = false;

	selectedHero!: Superhero | null;

	loading: boolean = false;

	private superheroService = inject(SuperheroService);
	private loadingService = inject(LoadingService);

	get paginatedSuperheroes(): Superhero[] {
		const startIndex = this.currentPage * this.itemsPerPage;

		return this.filteredSuperheroes.slice(startIndex, startIndex + this.itemsPerPage);
	}

	ngOnInit(): void {
		this.getAll();
		this.loadingService.loading$.subscribe(isLoading => {
			this.loading = isLoading;
		});
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
		this.selectedHero = null;
		this.openModal = true;
	}

	handleEdit(hero: Superhero): void {
		this.selectedHero = hero;

		this.openModalEdit = true
		this.openModal = true;
	}

	showDeleteConfirm(hero?: Superhero) {
		if (hero) this.selectedHero = hero

		this.showConfirm = !this.showConfirm
	}

	handleDelete(superhero: Superhero | null): void {
		if (superhero != null) this.superheroService.deleteSuperhero(superhero.id);
		this.showConfirm = !this.showConfirm
	}

	onHeroAdded(newHero: Superhero): void {
		this.superheroes.push(newHero);
		this.filteredSuperheroes = [...this.superheroes];

		this.openModal = false;
	}

	onHeroEdited(editedHero: Superhero): void {
		this.superheroService.editSuperhero(editedHero);
		this.openModalEdit = false
		this.openModal = false;
	}
}
