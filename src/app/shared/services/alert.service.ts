import { Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions
} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController ) { }

  async presentAlert(options : AlertOptions) {
    const alert = await this.alertController.create(options )
    await alert.present()
  }
}
