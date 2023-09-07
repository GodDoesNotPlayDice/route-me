import {Component} from '@angular/core';
import {ModalController} from "@ionic/angular";


@Component({
  selector: 'app-user-preferences-selector',
  templateUrl: './user-preferences-selector.component.html',
  styleUrls: ['./user-preferences-selector.component.scss'],
})
export class UserPreferencesSelectorComponent {
  name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
