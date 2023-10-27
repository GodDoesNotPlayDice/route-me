import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component( {
	standalone : true,
	selector   : 'app-chat-input',
	templateUrl: './chat-input.component.html',
	styleUrls  : [ './chat-input.component.scss' ],
	imports    : [
		IonicModule,
		CommonModule
	]
} )
export class ChatInputComponent {
	public send( $event: MouseEvent ): void {
		console.log( 'send' )
	}
}
