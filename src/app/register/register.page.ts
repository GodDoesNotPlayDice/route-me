import { CommonModule } from '@angular/common'
import {
  Component
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
  standalone : true,
  selector   : 'app-register',
  templateUrl: './register.page.html',
  styleUrls  : [ './register.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class RegisterPage {
}
