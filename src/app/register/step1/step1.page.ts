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
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { CheckboxInputComponent } from 'src/app/shared/components/checkbox-input/checkbox-input.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { ToastService } from 'src/app/shared/services/toast.service'
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
		AppBarCloneComponent,
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
		private alertService: AlertService,
		private loadingService : LoadingService,
		private toastService: ToastService,
		private router: Router,
		private auth: AuthService )
	{}

	@ViewChild( 'user' ) userInput!: InputTextComponent
	@ViewChild( 'password' ) passwordInput!: InputTextComponent
	@ViewChild( 'confirmpassword' ) passwordConfirmInput!: InputTextComponent
	@ViewChild( 'check' ) checkbox!: CheckboxInputComponent
	@ViewChild( 'appBar' ) appBar !: AppBarCloneComponent

	formGroup!: FormGroup
	checkerGroup!: FormGroup

	async submit(): Promise<void> {
		if ( this.userInput.textControl.valid ) {
			const emailExist = await this.auth.checkUserEmail(
				this.userInput.textControl.value! )

			if ( emailExist ) {
				this.userInput.textControl.setErrors( {
					duplicate: true
				} )
				await this.alertService.presentAlert( {
					header : 'Advertencia',
					message: 'El correo que ingresaste ya existe',
					buttons: [
						{
							text: 'Aceptar'
						}
					]
				} )
			}
		}

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

		//TODO: si esta el check de mantener sesion, guardar en localstorage
		const email    = this.userInput.textControl.value!
		const password = this.passwordInput.textControl.value!
		await this.loadingService.showLoading( 'Guardando')
		const result   = await this.auth.userRegister( email, password )
		await this.loadingService.dismissLoading()
		if ( result ) {
			this.store.dispatch( notifyStep() )
			await this.router.navigate( [ '/register/step2' ] )
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
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

	async buttonClick(): Promise<void> {
		await this.submit()
		this.reset()
	}

	async leadClick(): Promise<void> {
		this.reset()
		await this.appBar.backPage()
	}

	private reset(): void {
		this.userInput.reset()
		this.passwordInput.reset()
		this.passwordConfirmInput.reset()
		this.checkbox.reset()
	}
}
