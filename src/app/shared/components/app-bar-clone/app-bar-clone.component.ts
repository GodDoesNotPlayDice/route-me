import { CommonModule } from '@angular/common'
import {
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-app-bar-clone',
	templateUrl: './app-bar-clone.component.html',
	styleUrls  : [ './app-bar-clone.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class AppBarCloneComponent {

	constructor(
		private router: Router
	)
	{}

	@Input() href: string | null              = null
	@Input() leadNameIcon: string             = 'arrow-back-outline'
	@Input( { required: true } ) label: string
	@Output() leadClicked: EventEmitter<void> = new EventEmitter<void>()

	async leadClick(): Promise<void> {
		this.leadClicked.emit()
	}

	async backPage() {
		if ( this.href !== null ) {
			await this.router.navigate( [ this.href ] )
		}
	}
}
