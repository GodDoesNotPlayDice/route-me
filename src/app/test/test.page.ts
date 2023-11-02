import { CommonModule } from '@angular/common'
import {
	Component,
	OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
	Camera,
	CameraResultType
} from '@capacitor/camera'
import { Preferences } from '@capacitor/preferences'
import { IonicModule } from '@ionic/angular'
import { AlertService } from 'src/app/shared/services/alert.service'
import { ImageUploadService } from 'src/app/shared/services/image-upload.service'
import { dataURItoBlob } from 'src/package/image-upload-api/shared/utils/image-conversion'

@Component( {
	selector   : 'app-test',
	templateUrl: './test.page.html',
	styleUrls  : [ './test.page.scss' ],
	standalone : true,
	imports    : [ IonicModule, CommonModule, FormsModule ]
} )
export class TestPage implements OnInit {

	constructor( private imageService: ImageUploadService ,
		private alert : AlertService)
	{ }

	async ngOnInit(): Promise<void> {
		await Preferences.set( { key: 'capacitor', value: 'true' } )

		const val = await Preferences.get( { key: 'capacitor' } )
		await this.alert.presentAlert({
			header: 'result',
			message: `response: ${val.value}`
		})
	}

	async onPhoto(): Promise<void> {
		const img       = await Camera.getPhoto( {
			quality     : 90,
			allowEditing: true,
			resultType  : CameraResultType.DataUrl
		} )
		const imageBlob = dataURItoBlob( img.dataUrl! )
		const fileName  = `${ new Date().getTime() }.${ img.format }`
		const result    = await this.imageService.uploadImage( imageBlob, fileName )
		if ( result.isOk() ) {
			console.log( 'url' )
			console.log( result.unwrap() )
		}
	}
}
