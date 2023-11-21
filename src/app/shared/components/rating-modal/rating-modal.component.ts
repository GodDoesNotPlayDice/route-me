import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import {
	IonicModule,
	ModalController,
	RangeCustomEvent
} from '@ionic/angular'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { RatingService } from 'src/app/shared/services/rating.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Email } from 'src/package/shared/domain/models/email'

@Component( {
	standalone : true,
	selector   : 'app-rating-modal',
	templateUrl: './rating-modal.component.html',
	styleUrls  : [ './rating-modal.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class RatingModalComponent {
	constructor(
		private ratingService: RatingService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private modalCtrl: ModalController
	)
	{ }

	@Input( { required: true } ) fromEmail: Email
	@Input( { required: true } ) toEmail: Email
	rating: number

	async confirm(): Promise<void> {
		await this.loadingService.showLoading( 'Enviando clasificacion' )
		const result = await this.ratingService.createRating( {
			senderEmail: this.fromEmail,
			userEmail  : this.toEmail,
			value      : this.rating
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


	public onChange( ev: Event ): void {
		console.log( 'onchange rating' )
		this.rating = ( ev as RangeCustomEvent ).detail.value.valueOf() as number
	}
}
