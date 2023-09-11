import {Component, ViewChild} from '@angular/core'
import { Store } from '@ngrx/store'
import { CountrySelectorComponent } from 'src/app/shared/components/country-selector/country-selector.component'
import { AppState } from 'src/app/state/app.state'
import { notifyStep } from 'src/app/state/stepper/step.actions'
import {
  RadioButtonComponent,
  RadioButtonData
} from "../../shared/components/radio-button/radio-button.component";
import {FormGroup} from "@angular/forms";
import {ViewDidEnter} from "@ionic/angular";
import {
  InputTextComponent
} from "../../shared/components/input-text/input-text.component";
import {
  DateSelectorComponent
} from "../../shared/components/date-selector/date-selector.component";

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements ViewDidEnter{

  constructor(private store : Store<AppState>) {}

  @ViewChild('user') userInput !: InputTextComponent
  @ViewChild('lastName') lastNameInput !: InputTextComponent
  @ViewChild('phone') phoneInput !: CountrySelectorComponent
  @ViewChild('date') dateSelectorInput !: DateSelectorComponent
  @ViewChild('radio') radioButtonInput !: RadioButtonComponent

  buttons : RadioButtonData[] = [
    {
      name: "Hombre",
      icon: "male-outline"
    },
    {
      name: "Mujer",
      icon: "female-outline"
    },
  ]

  formGroup! : FormGroup
  ionViewDidEnter() {
    this.formGroup = new FormGroup([
      this.userInput.textControl,
      this.lastNameInput.textControl,
      this.dateSelectorInput.dateControl,
      this.radioButtonInput.radioControl
    ])
  }

  submit($event: SubmitEvent) {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if(
      !this.formGroup.valid
    ) return

    console.log("step 2 check")
    this.store.dispatch(notifyStep())
  }
}


