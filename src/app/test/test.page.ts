import { CommonModule } from '@angular/common'
import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'

@Component( {
	selector   : 'app-test',
	templateUrl: './test.page.html',
	styleUrls  : [ './test.page.scss' ],
	standalone : true,
	imports    : [ IonicModule, CommonModule, FormsModule, AppBarCloneComponent ]
} )
export class TestPage implements OnInit {

	constructor() { }

	@ViewChild( 'appBar' ) appbar!: AppBarCloneComponent

	async ngOnInit(): Promise<void> {
		// await Preferences.set( { key: 'capacitor', value: 'true' } )
		//
		// const val = await Preferences.get( { key: 'capacitor' } )
		// await this.alert.presentAlert( {
		// 	header : 'result',
		// 	message: `response: ${ val.value }`
		// } )
	}

	async backClick(): Promise<void> {
		await this.appbar.backPage()
	}
}
