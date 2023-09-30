import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Some } from 'oxide.ts'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { LabeledIconComponent } from 'src/app/shared/components/labeled-icon/labeled-icon.component'
import { AuthService } from 'src/app/shared/services'
import { defaultUsers } from 'src/main'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import {
  User
} from 'src/package/user'

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
    if ( authService.currentUser.isNone() ) {
      authService.currentUser = Some( defaultUsers[0] )
    }

    this.user = authService.currentUser.unwrap()
    this.edad =
      new Date().getFullYear() - this.passenger.birthDay.value.getFullYear()
  }

  edad: number
  user: User
  passenger : Passenger
}
