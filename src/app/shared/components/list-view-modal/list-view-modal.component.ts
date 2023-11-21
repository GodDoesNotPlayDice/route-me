import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	Input,
	TemplateRef
} from '@angular/core'
import {
	IonicModule,
	ModalController
} from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-list-view-modal',
	templateUrl: './list-view-modal.component.html',
	styleUrls  : [ './list-view-modal.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class ListViewModalComponent {

	constructor( private modalCtrl: ModalController ) { }

	@Input( { required: true } ) projectedContent: TemplateRef<ElementRef>

	async confirm() {
		await this.modalCtrl.dismiss( undefined, 'confirm' )
	}
}
