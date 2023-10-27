import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { LabeledIconComponent } from 'src/app/shared/components/labeled-icon/labeled-icon.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { User } from 'src/package/user/domain/models/user'

@Component( {
	standalone : true,
	selector   : 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls  : [ './profile.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		DividerComponent,
		LabeledIconComponent,
		AdaptativeButtonComponent
	]
} )
export class ProfilePage implements ViewDidEnter {

	constructor( private authService: AuthService,
		private router: Router )
	{
	}

	public ionViewDidEnter(): void {
		if ( this.authService.currentUser.isSome() &&
			this.authService.currentPassenger.isSome() )
		{
			this.user      = this.authService.currentUser.unwrap()
			this.passenger = this.authService.currentPassenger.unwrap()
			this.edad      =
				new Date().getFullYear() - this.passenger.birthDay.value.getFullYear()
		}


	}

	edad: number | undefined
	user: User | undefined
	passenger: Passenger | undefined
	driver: Driver | undefined

	async onLogout(): Promise<void> {
		const result = await this.authService.authLogout()
		if ( result ) {
			await this.router.navigate( [ '/login' ] )
		}
		else {
			console.log( 'logout fail' )
		}
	}
}
