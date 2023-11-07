import { CommonModule } from '@angular/common'
import {
	Component,
	Input
} from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'

@Component( {
	standalone : true,
	selector   : 'app-drive-card',
	templateUrl: './drive-card.component.html',
	styleUrls  : [ './drive-card.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		AvatarComponent
	]
} )
export class DriveCardComponent {

	constructor( private router: Router )
	{ }

	@Input( { required: true } ) info: DriverCardInfo

	async buttonClick( $event: MouseEvent ) {
		$event.preventDefault()
		await this.router.navigate( [ '/trip-details' ],
			{
				state: {
					id: this.info.id
				}
			} )
	}
}


