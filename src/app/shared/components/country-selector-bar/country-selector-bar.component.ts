import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { CountrySelectorComponent } from 'src/app/shared/components/country-selector/country-selector.component'

@Component({
  selector: 'app-phone-selector-bar',
  templateUrl: './country-selector-bar.component.html',
  styleUrls: ['./country-selector-bar.component.scss'],
})
export class CountrySelectorBarComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  readonly phoneControl = new FormControl( false, control => {
    return null
  } )


  ngOnInit() {}

  async openModal(){
    const modal = await this.modalCtrl.create( {
      component: CountrySelectorComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    if ( role === 'confirm' ) {
    }
  }

}
