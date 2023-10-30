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
	ActionSheetController,
	IonicModule
} from '@ionic/angular'

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
	constructor( private actionSheetCtrl: ActionSheetController ) {}

	value = ''
	@Input({ required: true }) label: string
	@Input({ required: true }) placeholder: string
	readonly fileControl = new FormControl( '', [Validators.required])
	async presentActionSheet() {
		const actionSheet = await this.actionSheetCtrl.create( {
			header : 'Actions',
			buttons: [
				{
					text   : 'Tomar foto',
					handler: () => {
						console.log( 'Tomar foto' )
					}
				},
				{
					text   : 'Subir foto',
					handler: () => {
						console.log( 'Subir foto' )
					}
				},
				{
					text   : 'Subir archivo',
					handler: () => {
						console.log( 'Subir archivo' )
					}
				}
			]
		} )

		await actionSheet.present()
	}

	reset(){
		this.value = ''
		this.fileControl.reset()
	}
}
