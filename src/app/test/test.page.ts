import { CommonModule } from '@angular/common'
import {
	Component,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { FormsModule } from '@angular/forms'
import {
	Camera,
	CameraResultType
} from '@capacitor/camera'
import { IonicModule } from '@ionic/angular'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { ImageUploadService } from 'src/app/shared/services/image-upload.service'
import { dataURItoBlob } from 'src/package/image-upload-api/shared/utils/image-conversion'

@Component( {
	selector   : 'app-test',
	templateUrl: './test.page.html',
	styleUrls  : [ './test.page.scss' ],
	standalone : true,
	imports    : [ IonicModule, CommonModule, FormsModule, AppBarCloneComponent ]
} )
export class TestPage implements OnInit, OnDestroy {

	constructor( private imageService: ImageUploadService,
		private firebase: AngularFireDatabase,
		private alert: AlertService )
	{ }

	@ViewChild( 'appBar' ) appbar!: AppBarCloneComponent

	async ngOnInit(): Promise<void> {
		// await Preferences.set( { key: 'capacitor', value: 'true' } )
		//
		// const val = await Preferences.get( { key: 'capacitor' } )
		// await this.alert.presentAlert( {
		// 	header : 'result',
		// 	message: `response: ${ val.value }`
		// } )

		const ref = this.firebase.database.ref( `fake` )

		ref.on( 'child_added', ( snapshot ) => {
			console.log( 'snapshot' )
			console.log( snapshot.val() )
		} )
	}

	public ngOnDestroy(): void {
		// this.firebase.database.ref( `fake` ).off()
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

	async backClick(): Promise<void> {
		await this.appbar.backPage()
	}
}
