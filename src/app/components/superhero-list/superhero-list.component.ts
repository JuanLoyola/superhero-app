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
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NoResults } from "../404/404.component";

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

	private superheroService = inject(SuperheroService);
	private loadingService = inject(LoadingService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);

	get paginatedSuperheroes(): Superhero[] {
		const startIndex = this.currentPage * this.itemsPerPage;

		return this.filteredSuperheroes.slice(startIndex, startIndex + this.itemsPerPage);
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			if (params['name']) {
				this.superheroService.getSuperheroesByName(params['name']).subscribe(heroes => {
					this.filteredSuperheroes = heroes;
				});
			} else if (params['id']) {
				this.superheroService.getSuperheroById(+params['id']).subscribe(hero => {
					this.filteredSuperheroes = hero ? [hero] : [];
				});
			} else {
				this.getAllSuperheroes();
			}
		});

		this.loadingService.loading$.subscribe(isLoading => {
			this.loading = isLoading;
		});
	}

	getAllSuperheroes(): void {
		this.superheroService.getAllSuperheroes().subscribe(heroes => {
			this.superheroes = heroes;
			this.filteredSuperheroes = heroes;
		});
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

	handleAdd() {
		this.selectedHero = null;
		this.handleModal('add')
	}

	handleEdit(hero: Superhero): void {
		this.selectedHero = hero;
		this.handleModal('edit')
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
		this.handleModal('add')
	}

	onHeroEdited(editedHero: Superhero): void {
		this.superheroService.editSuperhero(editedHero);
		this.handleModal('edit')
	}

	handleModal(type: 'add' | 'edit'): void {
		if (type === 'edit') this.openModalEdit = !this.openModalEdit;

		this.openModal = !this.openModal;
	}

	resetInputs() {
		this.searchID = ''
		this.searchTerm = ''

		this.getAllSuperheroes()
	}
}
