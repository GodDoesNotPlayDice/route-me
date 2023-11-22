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
import { ImageUploadService } from 'src/app/shared/services/image-upload.service'
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
	constructor(
		private driverService: DriverService,
		private toastService: ToastService,
		private imageUploadService: ImageUploadService
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

		const licence       = this.licenceInput.fileControl.value!
		const uploadLicence = await this.imageUploadService.uploadImage(
			licence.blob, licence.name )

		const register       = this.registerInput.fileControl.value!
		const uploadRegister = await this.imageUploadService.uploadImage(
			register.blob, register.name )

		const record       = this.recordInput.fileControl.value!
		const uploadRecord = await this.imageUploadService.uploadImage( record.blob,
			record.name )

		const history       = this.historyInput.fileControl.value!
		const uploadHistory = await this.imageUploadService.uploadImage(
			history.blob, history.name )

		if ( uploadLicence.isErr() || uploadRegister.isErr() ||
			uploadRecord.isErr() || uploadHistory.isErr() )
		{
			uploadLicence.isOk() ? await this.imageUploadService.delete(
				uploadLicence.unwrap() ) : null
			uploadRegister.isOk() ? await this.imageUploadService.delete(
				uploadRegister.unwrap() ) : null
			uploadRecord.isOk() ? await this.imageUploadService.delete(
				uploadRecord.unwrap() ) : null
			uploadHistory.isOk() ? await this.imageUploadService.delete(
				uploadHistory.unwrap() ) : null
			await this.toastService.presentToast( {
				message : 'Hubo un problema al subir las imagenes. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
			return
		}

		const result = await this.driverService.driverRegister(
			this.carInput.carControl.value!.id,
			[
				{
					name     : 'Licencia',
					reference: uploadLicence.unwrap()
				},
				{
					name     : 'Registro',
					reference: uploadRegister.unwrap()
				},
				{
					name     : 'Antecedentes',
					reference: uploadRecord.unwrap()
				},
				{
					name     : 'Historial',
					reference: uploadHistory.unwrap()
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
