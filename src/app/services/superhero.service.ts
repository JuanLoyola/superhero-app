import { Injectable } from '@angular/core';
import { Superhero } from '../models/superheroes.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  constructor() { }

  private superheroes: Superhero[] = [
    {id:1, name: '', description:''},
    {id:2, name:'', description:''},
    {id:3, name:'', description:''},
    {id:4, name:'', description:''},
    {id:5, name:'', description:''}
  ]

  private superheroes$ = new BehaviorSubject<Superhero[]>(this.superheroes)

  
  getAllSuperheroes(): Observable<Superhero[]> {
    return this.superheroes$.asObservable()
  }

  getSuperheroById(id: number): Observable<Superhero | undefined> {
    return this.superheroes$.asObservable().map(heroes => heroes.find((hero: Superhero) => hero.id === id))
  }

  getSuperheroesByName(name: string): Observable<Superhero[]> {
    return this.superheroes$.asObservable().map(heroes => heroes.filter((hero:Superhero) => hero.name.toLowerCase().includes(name.toLowerCase())))
  }

  addSuperhero(superhero: Superhero): void {
    this.superheroes.push(superhero)
    this.superheroes$.next(this.superheroes)
  }

  updateSuperhero(superhero: Superhero): void {
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
