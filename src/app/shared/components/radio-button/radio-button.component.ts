import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent{
  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() radioButtons: RadioButtonData[] = [];
  @Input() name! : string

  isChecked: boolean = false;

  readonly radioControl = new FormControl(false, [Validators.requiredTrue]);

  onRadioChange($event: Event) {
    if (!this.isChecked) {
      this.isChecked = true;
    }
    this.isCheckedChange.emit(this.isChecked);
    this.radioControl.patchValue(this.isChecked);
    this.radioControl.updateValueAndValidity();
  }
}

export interface RadioButtonData {
  icon : string
  name : string
}
