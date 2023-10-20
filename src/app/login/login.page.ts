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
		private firebase: AngularFireAuth,
		private router: Router,
		private alertService: AlertService
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
