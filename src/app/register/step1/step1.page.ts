import { CommonModule } from '@angular/common'
import {
	Component,
	ViewChild
} from '@angular/core'
import {
	FormGroup,
	FormsModule
} from '@angular/forms'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { Store } from '@ngrx/store'
import { CheckboxInputComponent } from 'src/app/shared/components/checkbox-input/checkbox-input.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AppState } from 'src/app/shared/state/app.state'
import { notifyStep } from 'src/app/shared/state/stepper/step.actions'

@Component( {
	standalone : true,
	selector   : 'app-step1',
	templateUrl: './step1.page.html',
	styleUrls  : [ './step1.page.scss' ],
	imports    : [
		IonicModule,
		StepperComponent,
		OutlinedButtonComponent,
		InputTextComponent,
		CheckboxInputComponent,
		FilledButtonComponent,
		FormsModule,
		CommonModule
	]
} )
export class Step1Page implements ViewDidEnter {

	constructor( private store: Store<AppState>,
		private router: Router,
		private auth: AuthService )
	{}

	@ViewChild( 'user' ) userInput!: InputTextComponent
	@ViewChild( 'password' ) passwordInput!: InputTextComponent
	@ViewChild( 'confirmpassword' ) passwordConfirmInput!: InputTextComponent
	@ViewChild( 'check' ) checkbox!: CheckboxInputComponent

	formGroup!: FormGroup
	checkerGroup!: FormGroup

	async submit( $event: SubmitEvent ): Promise<void> {
		$event.preventDefault()
		this.checkerGroup.updateValueAndValidity()
		this.checkerGroup.markAllAsTouched()
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if (
			!this.formGroup.valid
		)
		{
			return
		}

		//TODO: enviar datos al servidor
		this.store.dispatch( notifyStep() )
		const email    = this.userInput.textControl.value!
		const password = this.passwordInput.textControl.value!
		await this.auth.userRegister( email, password )
		await this.router.navigate( [ '/register/step2' ] )
	}

	ionViewDidEnter() {
		this.checkerGroup = new FormGroup( {
			pw1: this.passwordInput.textControl,
			pw2: this.passwordConfirmInput.textControl
		}, control => {
			if ( control.value.pw1 !== control.value.pw2 ) {
				return { password: true }
			}
			return null
		} )

		this.formGroup = new FormGroup( [
			this.userInput.textControl,
			this.checkerGroup,
			this.checkbox.checkboxControl
		] )
	}
}
