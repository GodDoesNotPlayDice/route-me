import { CommonModule } from '@angular/common'
import {
	Component,
	ViewChild
} from '@angular/core'
import {
	FormGroup,
	FormsModule
} from '@angular/forms'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { CarModelSelectorComponent } from 'src/app/shared/components/car-model-selector/car-model-selector.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { FileInputComponent } from 'src/app/shared/components/file-input/file-input.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { DriverService } from 'src/app/shared/services/driver.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component( {
	selector   : 'app-register-driver',
	templateUrl: './register-driver.page.html',
	styleUrls  : [ './register-driver.page.scss' ],
	standalone : true,
	imports    : [ IonicModule, CommonModule, FormsModule, FileInputComponent,
		FilledButtonComponent, CarModelSelectorComponent, DividerComponent ]
} )
export class RegisterDriverPage implements ViewDidEnter {
	constructor( private driverService: DriverService,
		private toastService: ToastService
	)
	{ }

	@ViewChild( 'licencia' ) licenceInput !: FileInputComponent
	@ViewChild( 'registro' ) registerInput !: FileInputComponent
	@ViewChild( 'antecedentes' ) recordInput !: FileInputComponent
	@ViewChild( 'historial' ) historyInput !: FileInputComponent
	@ViewChild( 'car' ) carInput !: CarModelSelectorComponent

	waitForEnable = false

	formGroup!: FormGroup

	async ionViewDidEnter() {
		if ( this.driverService.currentDriver.isSome() &&
			!this.driverService.currentDriver.unwrap().enabled )
		{
			this.waitForEnable = true
		}

		this.formGroup = new FormGroup( [
			this.licenceInput.fileControl,
			this.registerInput.fileControl,
			this.recordInput.fileControl,
			this.historyInput.fileControl,
			this.carInput.carControl
		] )
	}

	async buttonClick() {
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if ( !this.formGroup.valid )
		{
			return
		}

		const result = await this.driverService.driverRegister(
			this.carInput.carControl.value!.id,
			[
				{
					//TODO: habilitar files
					//TODO: se podria hacer driver document name enum
					name     : 'Licencia',
					reference: this.licenceInput.fileControl.value!
				},
				{
					name     : 'Registro',
					reference: this.registerInput.fileControl.value!
				},
				{
					name     : 'Antecedentes',
					reference: this.recordInput.fileControl.value!
				},
				{
					name     : 'Historial',
					reference: this.historyInput.fileControl.value!
				}
			]
		)

		if ( result ) {
			await this.toastService.presentToast( {
				message : 'Registro exitoso',
				duration: 1500,
				position: 'bottom'
			} )
			this.reset()
			this.waitForEnable = true
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}

	private reset() {
		this.carInput.reset()
		this.licenceInput.reset()
		this.registerInput.reset()
		this.recordInput.reset()
		this.historyInput.reset()
		this.formGroup.reset()
	}
}
