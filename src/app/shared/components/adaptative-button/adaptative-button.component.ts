import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-adaptative-button',
	templateUrl: './adaptative-button.component.html',
	styleUrls  : [ './adaptative-button.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class AdaptativeButtonComponent {
	@Input() disabled: boolean                       = false
	@Input() disabledColor: string                   = 'bg-gray-400'
	@Input( { required: true } ) text: string        = ''
	@Input( { required: true } ) color: string       = ''
	@Input( { required: true } ) size: string        = ''
	@Input( { required: true } ) color_hover: string = ''
	@Input( { required: true } ) font_size: string   = ''
	@Input( { required: true } ) text_color: string  = ''
}
