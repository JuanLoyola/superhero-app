import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Superhero } from '../../models/superheroes.models';
import { LoadingService } from '../../services/loading.service';
import { MatIcon } from '@angular/material/icon';
import {
    MatError,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuperheroService } from '../../services/superhero.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'modal-superhero',
    templateUrl: './modal-superhero.component.html',
    styleUrls: ['./modal-superhero.component.css'],
    standalone: true,
    imports: [
        MatIcon,
        MatFormField,
        MatLabel,
        MatError,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule
    ],
})
export class ModalSuperhero {
    constructor(
        private fb: FormBuilder,
        private loadingService: LoadingService,
        private superheroService: SuperheroService
    ) { }

    @Input() hero!: Superhero | null;
    @Input() type: 'add' | 'edit' = 'add';

    showLoading = false

    @Output() heroAdded = new EventEmitter<Superhero>();
    @Output() heroEdited = new EventEmitter<Superhero>();
    @Output() close = new EventEmitter<void>();

    private _formBuilder = inject(FormBuilder);

    firstFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
    });

    secondFormGroup = this._formBuilder.group({
        description: ['', Validators.required],
    });

    ngOnInit() {
        if (this.type === 'edit' && this.hero) {
            console.log(this.hero)
            this.firstFormGroup.patchValue({
                name: this.hero.name,
            });
            this.secondFormGroup.patchValue({
                description: this.hero.description,
            });
        } else {
            this.firstFormGroup.reset();
            this.secondFormGroup.reset();
        }
    }

    private generateUniqueId(): number {
        let newId: number;
        let superheroes: Superhero[] = [];

        this.superheroService.getAllSuperheroes().subscribe(heroes => {
            superheroes = heroes;
        });

        do {
            newId = Math.floor(Math.random() * 50);
        } while (superheroes.some((hero: Superhero) => hero.id === newId));

        return newId;
    }

    onSubmit() {
        if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
            this.loadingService.show();
            this.showLoading = true;

            const id = this.type === 'add' ? this.generateUniqueId() : this.hero?.id;

            const superheroData: Superhero = {
                id: id!,
                name: this.firstFormGroup.get('name')!.value!,
                description: this.secondFormGroup.get('description')!.value!
            };

            console.log(superheroData)

            setTimeout(() => {
                this.loadingService.hide();
                this.showLoading = false;
                this.type === 'add'
                    ? this.heroAdded.emit(superheroData)
                    : this.heroEdited.emit(superheroData);
            }, 2500);
        }
    }

    onClose() {
        this.close.emit();
    }
}
