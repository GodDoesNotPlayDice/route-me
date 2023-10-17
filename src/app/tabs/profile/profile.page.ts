import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { LabeledIconComponent } from 'src/app/shared/components/labeled-icon/labeled-icon.component'
import { AuthService } from 'src/app/shared/services/auth.service'
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
export class ProfilePage implements ViewDidEnter{

  constructor( private authService: AuthService ) {
  }

  public ionViewDidEnter(): void {
    if ( this.authService.currentUser.isSome() ) {
    this.user      = this.authService.currentUser.unwrap()
    this.passenger = this.authService.currentPassenger.unwrap()
    }

    if ( this.authService.currentPassenger.isSome() ) {
    this.edad      =
      new Date().getFullYear() - this.passenger!.birthDay.value.getFullYear()
    }

  }

  edad: number | undefined
  user: User | undefined
  passenger: Passenger | undefined
}
