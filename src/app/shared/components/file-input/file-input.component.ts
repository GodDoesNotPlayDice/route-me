import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import {
	FormControl,
	Validators
} from '@angular/forms'
import {
	Camera,
	CameraResultType
} from '@capacitor/camera'
import { IonicModule } from '@ionic/angular'
import { dataURItoBlob } from 'src/package/image-upload-api/shared/utils/image-conversion'

@Component( {
	standalone : true,
	selector   : 'app-file-input',
	templateUrl: './file-input.component.html',
	styleUrls  : [ './file-input.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class FileInputComponent {
	constructor() {}

	value                = ''
	@Input( { required: true } ) label: string
	@Input( { required: true } ) placeholder: string
	readonly fileControl = new FormControl<{
		blob: Blob,
		name: string
	} | null>( null, [ Validators.required ] )


	async reset() {
		this.fileControl.reset()
		this.value = ''
	}

	async loadFile() {
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
		this.value = 'Archivo cargado'
	}
}
