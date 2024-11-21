import { TestBed } from '@angular/core/testing';
import { SuperheroService } from './superhero.service';
import { Superhero } from '../models/superheroes.models';

describe('SuperheroService', () => {
    let service: SuperheroService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SuperheroService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all superheroes', () => {
        const superheroes = service.getAllSuperheroes()();
        expect(superheroes.length).toBe(8);
    });

    it('should return a superhero by ID', () => {
        const superhero = service.getSuperheroById(1);
        expect(superhero).toBeDefined();
        expect(superhero?.name).toBe('solar Flare');
    });

    it('should return undefined for a non-existing superhero ID', () => {
        const superhero = service.getSuperheroById(999);
        expect(superhero).toBeUndefined();
    });

    it('should return superheroes filtered by name', () => {
        const filteredHeroes = service.getSuperheroesByName('solar');
        expect(filteredHeroes.length).toBe(1);
        expect(filteredHeroes[0].name).toBe('solar Flare');
    });

    it('should add a new superhero', (done) => {
        const newHero: Superhero = { id: 9, name: 'New Hero', description: 'A new superhero' };

        service.addSuperhero(newHero);

        setTimeout(() => {
            const superheroes = service.getAllSuperheroes()();
            expect(superheroes.length).toBe(9);
            expect(superheroes[8].name).toBe('New Hero');
            done();
        }, 1000);
    });

    it('should edit an existing superhero', (done) => {
        const editedHero: Superhero = { id: 1, name: 'Updated Hero', description: 'An updated superhero' };
        service.editSuperhero(editedHero);
        setTimeout(() => {
            const superhero = service.getSuperheroById(1);
            expect(superhero?.name).toBe('Updated Hero');
            done();
        }, 1000);
    });

    it('should delete a superhero', (done) => {
        service.addSuperhero({ id: 9, name: 'New Hero', description: 'A new superhero' });
        setTimeout(() => {
            service.deleteSuperhero(9);
            setTimeout(() => {
                const superhero = service.getSuperheroById(9);
                expect(superhero).toBeUndefined();
                done();
            }, 1000);
        }, 1000);
    });
});
