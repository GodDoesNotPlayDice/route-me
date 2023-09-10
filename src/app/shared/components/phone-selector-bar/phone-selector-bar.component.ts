import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { PhoneSelectorComponent } from 'src/app/shared/components/phone-selector/phone-selector.component'

@Component({
  selector: 'app-phone-selector-bar',
  templateUrl: './phone-selector-bar.component.html',
  styleUrls: ['./phone-selector-bar.component.scss'],
})
export class PhoneSelectorBarComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  readonly phoneControl = new FormControl( false, control => {
    return null
  } )


  ngOnInit() {}

  async openModal(){
    const modal = await this.modalCtrl.create( {
      component: PhoneSelectorComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    if ( role === 'confirm' ) {
    }
  }

}
