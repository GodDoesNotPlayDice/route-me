import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls  : [ './logo.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class LogoComponent {
}
