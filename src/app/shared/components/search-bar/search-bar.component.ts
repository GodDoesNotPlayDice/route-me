import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { SearchModalComponent } from 'src/app/shared/components/search-modal/search-modal.component'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create( {
      component     : SearchModalComponent
    } )
    await modal.present()

    const { data, role } = await modal.onWillDismiss()
  }
}
