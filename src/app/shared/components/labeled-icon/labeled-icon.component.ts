import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

type LabeledIconPositionType = 'row' | 'col'

@Component( {
	standalone : true,
	selector   : 'app-labeled-icon',
	templateUrl: './labeled-icon.component.html',
	styleUrls  : [ './labeled-icon.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class LabeledIconComponent {

	@Input() position: LabeledIconPositionType = 'row'
	@Input() textLabel: string                 = ''
	@Input() iconName: string                  = 'logo-ionic'
	@Input() enabled: boolean                  = false
}
