import { Component, inject } from '@angular/core'
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Superhero } from '../../models/superheroes.models'
import { SuperheroService } from '../../services/superhero.service'

@Component({
  selector: 'modal-add',
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon
  ],
})
export class ModalAdd {
  private _formBuilder = inject(FormBuilder)
  private superheroService = inject(SuperheroService)

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  })

  secondFormGroup = this._formBuilder.group({
    description: ['', Validators.required],
  })

  isLinear = true;

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const newHero: Superhero = {
        id: Math.floor(Math.random() * 50),
        name: this.firstFormGroup.get('name')?.value || 'N/A',
        description: this.secondFormGroup.get('description')?.value || 'N/A'
      }
      console.log(`estamos mandando: ${JSON.stringify(newHero)}`);

      this.superheroService.addSuperhero(newHero);
    }
  }
}
