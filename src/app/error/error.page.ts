import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@Component( {
  selector   : 'app-error',
  templateUrl: './error.page.html',
  styleUrls  : [ './error.page.scss' ],
  standalone : true,
  imports    : [ IonicModule, CommonModule, FormsModule ]
} )
export class ErrorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
