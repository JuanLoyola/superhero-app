import { TestBed } from '@angular/core/testing';
import { SuperheroService } from './superhero.service';
import { LoadingService } from './loading.service';
import { Superhero } from '../models/superheroes.models';

describe('SuperheroService', () => {
    let service: SuperheroService;
    let loadingService: jasmine.SpyObj<LoadingService>;

    beforeEach(() => {
        const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

        TestBed.configureTestingModule({
            providers: [
                SuperheroService,
                { provide: LoadingService, useValue: loadingServiceSpy }
            ]
        });

        service = TestBed.inject(SuperheroService);
        loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all superheroes', (done) => {
        service.getAllSuperheroes().subscribe(superheroes => {
            expect(superheroes.length).toBe(8); // mockup to check add
            done();
        });
    });

    it('should return a superhero by ID', (done) => {
        service.getSuperheroById(1).subscribe(hero => {
            expect(hero).toBeDefined();
            expect(hero?.id).toBe(1);
            done();
        });
    });

    it('should add a superhero', (done) => {
        const newHero: Superhero = { id: 9, name: 'New Hero', description: 'A new superhero' };
        service.addSuperhero(newHero);

        service.getAllSuperheroes().subscribe(superheroes => {
            expect(superheroes.length).toBe(9); // default list have 8 items
            expect(superheroes).toContain(newHero);
            done();
        });
    });

    it('should edit a superhero', (done) => {
        const editedHero: Superhero = { id: 1, name: 'Edited Hero', description: 'An edited superhero' };
        service.editSuperhero(editedHero);

        service.getSuperheroById(1).subscribe(hero => {
            expect(hero).toBeDefined();
            expect(hero?.name).toBe('Edited Hero');
            done();
        });
    });

    it('should delete a superhero', (done) => {
        service.deleteSuperhero(1);

        service.getSuperheroById(1).subscribe(hero => {
            expect(hero).toBeUndefined();
            done();
        });
    });
}); 