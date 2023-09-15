import { CommonModule } from '@angular/common'
import {Component, Input} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InputAreaComponent {
  @Input() title: string = "Sobre Mi";
  @Input() placeholder: string = "";
  @Input() label: string = "";

  readonly textControl = new FormControl( '', control => {
    if (control.value.length === 0){
      control.addValidators( Validators.required )
      return { required: true }
    }
    if (control.value.length <= 5){
      control.addValidators(Validators.minLength(8))
      return { minlength: true }
    }
    return null
  } )

  onChange() {
    this.textControl.updateValueAndValidity()
  }
}
