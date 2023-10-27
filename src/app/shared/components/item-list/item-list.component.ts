import { CommonModule } from '@angular/common'
import {
	Component,
	Input,
	ViewChild
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {
	MatMenuModule,
	MatMenuTrigger
} from '@angular/material/menu'
import { IonicModule } from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component'


@Component( {
	standalone : true,
	selector   : 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls  : [ './item-list.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		AvatarComponent,
		AdaptativeButtonComponent,
		MatMenuModule,
		MatButtonModule,
		MatIconModule
	]
} )
export class ItemListComponent {
	@Input() text: string         = ''
	@Input() userName: string     = 'Juanito'
	@Input() userUrlImage: string = 'https://media.discordapp.net/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png?width=416&height=445'

	constructor() {
	}

	@ViewChild( MatMenuTrigger ) trigger!: MatMenuTrigger

	someMethod() {
		this.trigger.openMenu()
	}

}
