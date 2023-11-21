import { CommonModule } from '@angular/common'
import {
	Component,
	ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component( {
	standalone : true,
	selector   : 'app-reset-password',
	templateUrl: './reset-password.page.html',
	styleUrls  : [ './reset-password.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		InputTextComponent,
		FilledButtonComponent
	]
} )
export class ResetPasswordPage implements ViewDidEnter {

	constructor(
		private router: Router,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private auth: AuthService
	)
	{}

	@ViewChild( 'user' ) emailInput!: InputTextComponent
	formGroup!: FormGroup

	async ionViewDidEnter(): Promise<void> {
		this.formGroup = new FormGroup( [
			this.emailInput.textControl
		] )
	}

	async buttonClick(): Promise<void> {
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if (
			!this.formGroup.valid
		)
		{
			return
		}

		await this.loadingService.showLoading( 'Enviando peticion' )
		const result = await this.auth.resetPasswordSend(
			this.emailInput.textControl.value! )
		await this.loadingService.dismissLoading()
		if ( result ) {
			await this.toastService.presentToast( {
				message : 'Se envio la peticion. Se envio un correo en caso de existir',
				color   : 'success',
				duration: 2000,
				position: 'bottom'
			} )
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}
}
