import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
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
