import { Injectable } from '@angular/core';
import { Superhero } from '../models/superheroes.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  constructor() { }

  private superheroes: Superhero[] = [
    { id: 1, name: 'Solar Flare', description: 'A former astronaut who gained the power to manipulate solar energy after a space mission accident' },
    { id: 2, name: 'Shadow Walker', description: 'A mysterious vigilante with the ability to melt into shadows and travel through darkness' },
    { id: 3, name: 'Terra Force', description: 'An environmentalist who can control earth elements and communicate with plants' },
    { id: 4, name: 'Quantum Mind', description: 'A brilliant scientist with telepathic abilities and superhuman intelligence' },
    { id: 5, name: 'Crystal Guardian', description: 'A warrior with the power to create and manipulate crystal structures for both defense and offense' },
    { id: 6, name: 'Spiderman', description: 'A young man who gained spider-like abilities after being bitten by a radioactive spider, allowing him to climb walls and shoot webs' },
    { id: 7, name: 'Superman', description: 'The last son of Krypton, with super strength, flight ability, and other superhuman powers' },
    { id: 8, name: 'Pepsiman', description: 'The corporate mascot turned hero, with a mission to deliver Pepsi and refresh the world' },
  ]

  private superheroes$ = new BehaviorSubject<Superhero[]>(this.superheroes)


  getAllSuperheroes(): Observable<Superhero[]> {
    return this.superheroes$.asObservable()
  }

  getSuperheroById(id: number): Observable<Superhero | undefined> {
    return this.superheroes$.pipe(
      map(heroes => heroes.find((hero: Superhero) => hero.id === id))
    );
  }

  getSuperheroesByName(name: string): Observable<Superhero[]> {
    return this.superheroes$.pipe(
      map(heroes => heroes.filter((hero: Superhero) => hero.name.toLowerCase().includes(name.toLowerCase())))
    );
  }

  addSuperhero(superhero: Superhero): void {
    this.superheroes.push(superhero)
    this.superheroes$.next(this.superheroes)
  }

  editSuperhero(superhero: Superhero): void {
    const index = this.superheroes.findIndex(hero => hero.id === superhero.id)

    if (index !== -1) {
      this.superheroes[index] = superhero
      this.superheroes$.next(this.superheroes)
    }
  }

  deleteSuperhero(id: number): void {
    this.superheroes = this.superheroes.filter(hero => hero.id !== id)
    this.superheroes$.next(this.superheroes)
  }
}
