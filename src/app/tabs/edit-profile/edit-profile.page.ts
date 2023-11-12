import { CommonModule } from '@angular/common'
import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core'
import {
	FormControl,
	FormGroup,
	FormsModule
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import {
	Camera,
	CameraResultType
} from '@capacitor/camera'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { FilledButtonComponent } from 'src/app/shared/components/filled-button/filled-button.component'
import { InputAreaComponent } from 'src/app/shared/components/input-area/input-area.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MultipleSelectorInputComponent } from 'src/app/shared/components/multiple-selector-input/multiple-selector-input.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ImageUploadService } from 'src/app/shared/services/image-upload.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { PreferenceService } from 'src/app/shared/services/preference.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { dataURItoBlob } from 'src/package/image-upload-api/shared/utils/image-conversion'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { MultipleSelectorData } from 'src/package/shared/domain/components/multiple-selector-data'

@Component( {
	selector   : 'app-edit-profile',
	templateUrl: './edit-profile.page.html',
	styleUrls  : [ './edit-profile.page.scss' ],
	standalone : true,
	imports: [ IonicModule, CommonModule, FormsModule, AppBarCloneComponent,
		MatIconModule, InputTextComponent, InputAreaComponent,
		MultipleSelectorInputComponent, FilledButtonComponent ]
} )
export class EditProfilePage implements OnInit, ViewDidEnter {
	constructor(
		private authService: AuthService,
		private toastService: ToastService,
		private imageUploadService: ImageUploadService,
		private loadingService: LoadingService,
		private preferenceService: PreferenceService
	)
	{ }

	@ViewChild( 'appBar' ) appBar !: AppBarCloneComponent
	@ViewChild( 'user' ) userInput !: InputTextComponent
	@ViewChild( 'lastName' ) lastNameInput !: InputTextComponent
	@ViewChild( 'phone' ) phoneInput !: InputTextComponent
	@ViewChild( 'area' ) areaInput !: InputAreaComponent
	@ViewChild( 'preference' ) preferenceInput !: MultipleSelectorInputComponent

	readonly fileControl = new FormControl<{
		blob: Blob,
		name: string
	} | null>( null )

	loadingPreferences: boolean           = false
	dbPreferences: MultipleSelectorData[] = []
	selectedPreferences: MultipleSelectorData[] = []
	formGroup!: FormGroup
	passenger : Passenger
	tempUrl: string = ''
	async ngOnInit() {
		this.passenger = this.authService.currentPassenger.unwrap()

		this.selectedPreferences      = this.passenger.preferences.map(
			( preference ): MultipleSelectorData => ( {
				id      : preference.id.value,
				name    : preference.name.value,
				icon    : preference.icon.value,
				source  : preference.source.value,
				selected: false
			} ) )
	}

	async ionViewDidEnter(): Promise<void> {
		this.loadingPreferences = true

		const prefs = await this.preferenceService.getPreferences()

		this.dbPreferences      = prefs.map(
			( preference ): MultipleSelectorData => ( {
				id      : preference.id.value,
				name    : preference.name.value,
				icon    : preference.icon.value,
				source  : preference.source.value,
				selected: false
			} ) )
		this.loadingPreferences = false


		this.formGroup = new FormGroup( {
			user      : this.userInput.textControl,
			lastName  : this.lastNameInput.textControl,
			phone     : this.phoneInput.textControl,
			area      : this.areaInput.textControl,
			preference: this.preferenceInput.multipleSelectorControl
		} )
	}

	async onBack(): Promise<void> {
		await this.appBar.backPage()
	}

	async onLoadPhoto(): Promise<void> {
		const img       = await Camera.getPhoto( {
			quality     : 90,
			allowEditing: true,
			resultType  : CameraResultType.DataUrl
		} )
		const imageBlob = dataURItoBlob( img.dataUrl! )
		const fileName  = `${ new Date().getTime() }.${ img.format }`
		this.fileControl.patchValue( {
			blob: imageBlob,
			name: fileName
		} )
		this.fileControl.updateValueAndValidity()
		this.tempUrl = img.dataUrl!
	}

	async buttonClick(): Promise<void> {
		await this.loadingService.showLoading( 'Actualizando' )

		let image : string | undefined = undefined
		if ( this.fileControl.value !== null ) {
			const img = this.fileControl.value!
			const imgResult   = await this.imageUploadService.uploadImage( img.blob, img.name )

			if ( imgResult.isErr() ) {
				await this.toastService.presentToast( {
					message : 'Hubo un problema al subir la imagen. Intente denuevo',
					duration: 1500,
					position: 'bottom'
				} )
				await this.loadingService.dismissLoading()
				return
			}
			image = imgResult.unwrap()
		}

		const result = await this.authService.updatePassenger({
			preferences: this.preferenceInput.multipleSelectorControl.value!,
			name: this.userInput.textControl.value!,
			lastName: this.lastNameInput.textControl.value!,
			phone: this.phoneInput.textControl.value!,
			description: this.areaInput.textControl.value!,
			image: image
		})

		if ( !result ) {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
		else {
			await this.toastService.presentToast( {
				message : 'Se actualizó correctamente',
				duration: 1500,
				position: 'bottom'
			} )
		}

		await this.loadingService.dismissLoading()
	}
}
