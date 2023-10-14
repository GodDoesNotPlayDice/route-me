import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Some } from 'oxide.ts'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { LabeledIconComponent } from 'src/app/shared/components/labeled-icon/labeled-icon.component'
import { AuthService } from 'src/app/shared/services/auth.service'
import {
  defaultPassangers,
  defaultUsers
} from 'src/main'
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
    LabeledIconComponent
  ]
} )
export class ProfilePage {

  constructor( private authService: AuthService ) {
    if ( this.authService.currentUser.isNone() ) {
      this.authService.currentUser = Some( defaultUsers[0] )
    }

    if ( this.authService.currentPassenger.isNone() ) {
      this.authService.currentPassenger = Some( defaultPassangers[0] )
    }

    this.user      = this.authService.currentUser.unwrap()
    this.passenger = this.authService.currentPassenger.unwrap()
    this.edad      =
      new Date().getFullYear() - this.passenger.birthDay.value.getFullYear()
  }

  edad: number
  user: User
  passenger: Passenger
}
