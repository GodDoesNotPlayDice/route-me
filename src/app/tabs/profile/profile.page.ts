import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { LabeledIconComponent } from 'src/app/shared/components/labeled-icon/labeled-icon.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import { DriverService } from 'src/app/shared/services/driver.service'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { User } from 'src/package/user/domain/models/user'
import { AppBarCloneComponent } from '../../shared/components/app-bar-clone/app-bar-clone.component'

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
		AdaptativeButtonComponent,
		AppBarCloneComponent,
		MatIconModule,
		MatMenuModule
	]
} )
export class ProfilePage implements ViewDidEnter {

	constructor(
		private authService: AuthService,
		private driverService: DriverService,
		private router: Router
	)
	{}

	public ionViewDidEnter(): void {
		if ( this.authService.currentUser.isSome() &&
			this.authService.currentPassenger.isSome() )
		{
			this.user          = this.authService.currentUser.unwrap()
			this.passenger     = this.authService.currentPassenger.unwrap()
			this.edad          =
				new Date().getFullYear() - this.passenger.birthDay.value.getFullYear()
			this.profile_label = `Bienvenido ${ this.passenger.name.value }`

			if ( this.driverService.currentDriver.isSome() ) {
				this.driver = this.driverService.currentDriver.unwrap()
			}
		}
	}

	profile_label = 'Perfil'
	edad: number | undefined
	user: User | undefined
	passenger: Passenger | undefined
	driver: Driver | undefined

	//TODO: meter algun listener

	async onLogout(): Promise<void> {
		const result = await this.authService.authLogout()
		if ( result ) {
			await this.router.navigate( [ '/login' ] )
		}
		else {
			console.log( 'logout fail' )
		}
	}

	async editClick(): Promise<void> {
		await this.router.navigate( [ '/tabs/edit-profile' ] )
	}
}
