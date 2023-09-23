import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { Some } from 'oxide.ts'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { LabeledIconComponent } from 'src/app/shared/components/labeled-icon/labeled-icon.component'
import { User } from 'src/package/user/domain/entities/User'
//TODO: no deberia haber datos de infra en la capa de presentacion
import { defaultUsers } from 'src/package/user/infrastructure/auth/repository/AuthMemory'
import { AuthService } from 'src/app/services/auth.service'

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
      new Date().getFullYear() - this.user.birthDay.value.getFullYear()
  }

  edad: number
  user: User
}
