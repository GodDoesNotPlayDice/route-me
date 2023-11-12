import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	OnInit,
	ViewChild
} from '@angular/core'
import {
	IonicModule,
	ModalController
} from '@ionic/angular'
import { InputAreaComponent } from 'src/app/shared/components/input-area/input-area.component'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { ReportService } from 'src/app/shared/services/report.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { newReportID } from 'src/package/report/domain/models/report-id'
import { newReportMessage } from 'src/package/report/domain/models/report-message'
import { Email } from 'src/package/shared/domain/models/email'
import { ulid } from 'ulidx'

@Component( {
	standalone : true,
	selector   : 'app-report-modal',
	templateUrl: './report-modal.component.html',
	styleUrls  : [ './report-modal.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		InputAreaComponent
	]
} )
export class ReportModalComponent implements OnInit {

	constructor(
		private reportService: ReportService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private modalCtrl: ModalController
	)
	{}

	@Input( { required: true } ) fromEmail: Email
	@Input( { required: true } ) toEmail: Email
	@ViewChild( 'area' ) areaInput !: InputAreaComponent

	ngOnInit() {}

	async confirm() {
		if ( !this.areaInput.textControl.valid ) {
			return
		}
		const msg = newReportMessage( {
			value: this.areaInput.textControl.value!
		} )
		await this.loadingService.showLoading( 'Enviando reporte' )
		const result = await this.reportService.create( {
			id      : newReportID( {
				value: ulid()
			} )
				.unwrap(),
			toUser  : this.toEmail,
			fromUser: this.fromEmail,
			message : msg.unwrap()
		} )
		await this.loadingService.dismissLoading()

		if ( result.isErr() ) {
			await this.toastService.presentToast( {
				message : 'Hubo un problema al enviar el reporte. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
			return
		}

		await this.modalCtrl.dismiss( undefined, 'confirm' )
	}
}
