import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superheroes.models';
import { MatButton } from '@angular/material/button';
import { NoResults } from '../404/404.component';

@Component({
    selector: 'app-superhero-detail',
    templateUrl: './superhero-detail.component.html',
    styleUrls: ['./superhero-detail.component.css'],
    standalone: true,
    imports: [RouterLink, MatButton, NoResults]
})
export class SuperheroDetailComponent implements OnInit {
    superhero!: Superhero | undefined;

    constructor(private route: ActivatedRoute, private superheroService: SuperheroService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.superhero = this.superheroService.getAllSuperheroes()().find(hero => hero.id === +id);
        }
    }
} 