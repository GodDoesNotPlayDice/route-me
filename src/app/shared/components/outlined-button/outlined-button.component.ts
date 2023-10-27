import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-outlined-button',
	templateUrl: './outlined-button.component.html',
	styleUrls  : [ './outlined-button.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class OutlinedButtonComponent {
	@Input() contentText: string = ''
}
