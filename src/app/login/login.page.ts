import { CommonModule } from '@angular/common'
import {
	Component,
	ViewChild
} from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import {
	FormGroup,
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms'
import {
	Router,
	RouterLink
} from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { CheckboxInputComponent } from 'src/app/shared/components/checkbox-input/checkbox-input.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { LogoComponent } from 'src/app/shared/components/logo/logo.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { CurrencyDao } from 'src/package/currency-api/domain/dao/currency-dao'
import { IpDao } from 'src/package/ip-api/domain/dao/ip-dao'
import { createPreference } from 'src/package/preference/application/create-preference'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { newPreference } from 'src/package/preference/domain/models/preference'
import { newPreferenceIcon } from 'src/package/preference/domain/models/preference-icon'
import { newMoney } from 'src/package/shared/domain/models/money'
import { KilometerPricing } from 'src/package/trip/shared/kilometer-pricing'
import { preferenceSeeds } from 'src/test/app/stubs/seed/preference-seeds'

@Component( {
	standalone : true,
	selector   : 'app-login',
	templateUrl: './login.page.html',
	imports    : [
		IonicModule,
		CommonModule,
		LogoComponent,
		InputTextComponent,
		RouterLink,
		CheckboxInputComponent,
		FilledButtonComponent,
		OutlinedButtonComponent,
		FormsModule,
		ReactiveFormsModule
	],
	styleUrls  : [ './login.page.scss' ]
} )
export class LoginPage implements ViewDidEnter {
	constructor(
		private authService: AuthService,
		private router: Router,
		private alertService: AlertService,
	)
	{}

	@ViewChild( 'user' ) userInput!: InputTextComponent
	@ViewChild( 'password' ) passwordInput!: InputTextComponent
	@ViewChild( 'check' ) checkbox!: CheckboxInputComponent

	formGroup!: FormGroup

	async ionViewDidEnter() {
		this.formGroup = new FormGroup( [
			this.userInput.textControl,
			this.passwordInput.textControl
		] )
	}

	async submit( $event: SubmitEvent ) {
		$event.preventDefault()

		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if (
			!this.formGroup.valid
		)
		{
			return
		}

		// si el checkbox esta marcado
		// this.checkbox.checkboxControl.value

		const result = await this.authService.userLogin(
			this.userInput.textControl.value!,
			this.passwordInput.textControl.value!
		)

		if ( result ) {
			await this.router.navigate( [ '/tabs' ] )
		}
		else {

			await this.alertService.presentAlert( {
				header   : 'Error',
				subHeader: 'Credenciales no existen',
				message  : '',
				buttons  : [ 'OK' ]
			} )
		}
		this.userInput.reset()
		this.passwordInput.reset()
		this.checkbox.reset()
	}
}

