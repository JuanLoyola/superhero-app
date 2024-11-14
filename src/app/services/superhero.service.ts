import { Injectable, signal } from '@angular/core';
import { Superhero } from '../models/superheroes.models';

@Injectable({
	providedIn: 'root'
})
export class SuperheroService {

	private superheroes = signal<Superhero[]>([
		{ id: 1, name: 'Solar Flare', description: 'A former astronaut who gained the power to manipulate solar energy after a space mission accident' },
		{ id: 2, name: 'Shadow Walker', description: 'A mysterious vigilante with the ability to melt into shadows and travel through darkness' },
		{ id: 3, name: 'Terra Force', description: 'An environmentalist who can control plants and the earth' },
		{ id: 4, name: 'Quantum Mind', description: 'A brilliant scientist with telepathic abilities and superhuman intelligence' },
		{ id: 5, name: 'Crystal Guardian', description: 'A warrior with the power to create and manipulate crystal structures for both defense and offense' },
		{ id: 6, name: 'Spiderman', description: 'A young man who gained spider-like abilities after being bitten by a radioactive spider, allowing him to climb walls and shoot webs' },
		{ id: 7, name: 'Superman', description: 'The last son of Krypton, with super strength, flight ability, and other superhuman powers' },
		{ id: 8, name: 'Pepsiman', description: 'The corporate mascot turned hero, with a mission to deliver Pepsi and refresh the world' },
	])

	getAllSuperheroes() {
		return this.superheroes;
	}

	getSuperheroById(id: number): Superhero | undefined {
		return this.superheroes().find((hero: Superhero) => hero.id === id);
	}

	getSuperheroesByName(name: string): Superhero[] {
		return this.superheroes().filter((hero: Superhero) => hero.name.toLowerCase().includes(name.toLowerCase()));
	}

	addSuperhero(superhero: Superhero): void {
		setTimeout(() => {
			this.superheroes.update(current => [...current, superhero]);
		}, 800);
	}

	editSuperhero(superhero: Superhero): void {
		setTimeout(() => {
			const index = this.superheroes().findIndex(hero => hero.id === superhero.id);
			if (index !== -1) {
				this.superheroes.update(current => {
					const updated = [...current];
					updated[index] = superhero;
					console.log(updated)
					return updated;
				});
			}
		}, 800);
	}

	deleteSuperhero(id: number): void {
		this.superheroes.update(current => current.filter(hero => hero.id !== id));
	}
}
