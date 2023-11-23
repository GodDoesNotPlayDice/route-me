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
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { RadioInputComponent } from 'src/app/shared/components/radio-input/radio-input.component'
import { SingleSelectorInputComponent } from 'src/app/shared/components/single-selector-input/single-selector-input.component'
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { CountryPhoneCodeService } from 'src/app/shared/services/country-phone-code.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { AppState } from 'src/app/shared/state/app.state'
import { notifyStep } from 'src/app/shared/state/stepper/step.actions'
import { RadioButtonData } from 'src/package/shared/domain/components/radio-button-data'
import { SingleSelectorData } from 'src/package/shared/domain/components/single-selector-data'

@Component( {
	standalone : true,
	selector   : 'app-step2',
	templateUrl: './step2.page.html',
	styleUrls  : [ './step2.page.scss' ],
	imports    : [
		IonicModule,
		StepperComponent,
		InputTextComponent,
		SingleSelectorInputComponent,
		DateSelectorComponent,
		RadioInputComponent,
		FilledButtonComponent,
		FormsModule,
		CommonModule,
		AppBarCloneComponent
	]
} )
export class Step2Page implements ViewDidEnter {

	constructor( private store: Store<AppState>,
		private toastService: ToastService,
		private loadingService: LoadingService,
		private countryService: CountryPhoneCodeService,
		private auth: AuthService,
		private router: Router )
	{
		this.countryService.countriesList$.subscribe(
			( countries ) => {
				this.countries = countries.map( ( country ): SingleSelectorData =>
					( {
						id      : country.code.value,
						name    : country.name.common,
						image   : country.flag.png,
						selected: false
					} ) )
			}
		)
	}

	@ViewChild( 'user' ) userInput !: InputTextComponent
	@ViewChild( 'lastName' ) lastNameInput !: InputTextComponent
	@ViewChild( 'phone' ) phoneInput !: InputTextComponent
	@ViewChild( 'country' ) countryInput !: SingleSelectorInputComponent
	@ViewChild( 'date' ) dateSelectorInput !: DateSelectorComponent
	@ViewChild( 'radio' ) radioButtonInput !: RadioInputComponent
	@ViewChild( 'appBar' ) appBar !: AppBarCloneComponent

	countries: SingleSelectorData[] = []

	genderButtonsInfo: RadioButtonData[] = [
		{
			name: 'Male',
			icon: 'male-outline'
		},
		{
			name: 'Female',
			icon: 'female-outline'
		},
		{
			name: 'None',
			icon: 'male-female-outline'
		}
	]

	formGroup!: FormGroup

	ionViewDidEnter() {
		this.formGroup = new FormGroup( [
			this.userInput.textControl,
			this.lastNameInput.textControl,
			this.phoneInput.textControl,
			this.countryInput.singleSelectorControl,
			this.dateSelectorInput.dateControl,
			this.radioButtonInput.radioControl
		] )
	}

	async submit() {
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if (
			!this.formGroup.valid
		)
		{
			return
		}

		await this.loadingService.showLoading( 'Guardando' )
		const result = await this.auth.registerPassenger( {
			name    : this.userInput.textControl.value!,
			lastName: this.lastNameInput.textControl.value!,
			phone   : this.phoneInput.textControl.value!,
			country : this.countryInput.singleSelectorControl.value!,
			birthDay: this.dateSelectorInput.dateControl.value!,
			gender  : this.radioButtonInput.radioControl.value!
		} )
		await this.loadingService.dismissLoading()

		if ( result ) {
			this.store.dispatch( notifyStep() )
			await this.router.navigate( [ '/register/step3' ] )
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}

	async leadClick(): Promise<void> {
		const isDelete = await this.auth.deleteAccount()
		if ( isDelete ) {
			await this.appBar.backPage()
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}

	private reset(): void {
		this.userInput.reset()
		this.lastNameInput.reset()
		this.phoneInput.reset()
		this.dateSelectorInput.reset()
		this.countryInput.reset()
		this.radioButtonInput.reset()
	}

	async buttonClick(): Promise<void> {
		await this.submit()
		//this.reset()
	}
}
