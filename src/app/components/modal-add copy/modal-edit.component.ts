import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Superhero } from '../../models/superheroes.models';
import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
  ],
})
export class ModalEdit {
  superheroes: Superhero[] = [];

  private _formBuilder = inject(FormBuilder);
  private superheroService = inject(SuperheroService);

  @Input() hero!: Superhero;
  @Output() heroEdited = new EventEmitter<Superhero>();

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    description: ['', Validators.required],
  });

  isLinear = true;

  ngOnInit() {
    if (this.hero) {
      this.firstFormGroup.patchValue({
        name: this.hero.name,
      });
      this.secondFormGroup.patchValue({
        description: this.hero.description,
      });
    }
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const editedHero: Superhero = {
        id: this.hero.id,
        name: this.firstFormGroup.get('name')?.value || 'N/A',
        description: this.secondFormGroup.get('description')?.value || 'N/A',
      };

      this.heroEdited.emit(editedHero);
      console.log(editedHero);
      // TODO: no estoy usando los services mejorar esto
      // this.superheroService.editSuperhero(editedHero)
    }
  }
}
