import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
	IonicModule,
	ModalController,
	RangeCustomEvent
} from '@ionic/angular'
import { Email } from 'src/package/shared/domain/models/email'

@Component( {
	standalone : true,
	selector   : 'app-report-modal',
	templateUrl: './report-modal.component.html',
	styleUrls  : [ './report-modal.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		FormsModule
	]
} )
export class ReportModalComponent implements OnInit {

	constructor( private modalCtrl: ModalController ) { }

	@Input( { required: true } ) emailUser: Email
	public rating: number

	async confirm(): Promise<void> {
		await this.modalCtrl.dismiss( undefined, 'confirm' )
	}

	public ngOnInit(): void {
		console.log( 'this.emailUser' )
		console.log( this.emailUser )
	}

	public onChange( ev: Event ): void {
		console.log( 'onchange' )
		const a = ( ev as RangeCustomEvent ).detail.value
		console.log( 'ionChange emitted value:', a )
		console.log( 'value:', a.valueOf() )
		console.log( 'value:', a.toString() )
	}
}
