import { Component } from '@angular/core';
import {
  UserPreferencesSelectorComponent
} from "../user-preferences-selector/user-preferences-selector.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-user-preferences-selector-bar',
  templateUrl: './user-preferences-selector-bar.component.html',
  styleUrls: ['./user-preferences-selector-bar.component.scss'],
})
export class UserPreferencesSelectorBarComponent {

  constructor( private modalCtrl: ModalController) {}

  message = 'This modal example uses the modalController to present and dismiss modals.';

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UserPreferencesSelectorComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
