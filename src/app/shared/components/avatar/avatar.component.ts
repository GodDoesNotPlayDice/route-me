import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Option } from 'oxide.ts'

@Component( {
	standalone : true,
	selector   : 'app-avatar-home',
	templateUrl: './avatar.component.html',
	styleUrls  : [ './avatar.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class AvatarComponent {
	@Input( { required: true } ) url: string | null
}
