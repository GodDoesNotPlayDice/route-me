import { CommonModule } from '@angular/common'
import {
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { BubbleChatComponent } from 'src/app/shared/components/bubble-chat/bubble-chat.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChatService } from 'src/app/shared/services/chat.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Message } from 'src/package/message/domain/models/message'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

@Component( {
	standalone : true,
	selector   : 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls  : [ './chat.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		BubbleChatComponent,
		AppBarCloneComponent,
		FormsModule
	]
} )
export class ChatPage implements OnInit, OnDestroy {

	constructor(
		private chatService: ChatService,
		private toastService: ToastService,
		private authService: AuthService,
		private alertService: AlertService,
		private router: Router
	)
	{}

	loading: boolean                       = false
	messages: Message[]                    = []
	tripID: string | null                  = null
	chatID: string | null                  = null
	private messagesChange: Subscription
	passengerOwner: Passenger
	// passengersTrip : Passenger[]
	passengersTrip: Map<string, Passenger> = new Map<string, Passenger>()
	inputTextValue: string                 = ''
	sendingText: boolean                   = false

	async ngOnInit(): Promise<void> {
		this.passengerOwner = this.authService.currentPassenger.unwrap()
		this.loading        = true
		const state         = this.router.getCurrentNavigation()?.extras.state
		const chatID        = state?.['chatID'] ?? null
		const tripID        = state?.['tripID'] ?? null
		if ( chatID === null || tripID === null ) {
			await this.router.navigate( [ '/tabs/home' ] )
			return
		}

		const chatResult = await this.chatService.getById( chatID )

		const messageStream = await this.chatService.listen( chatID )

		if ( chatResult.isErr() || messageStream.isErr() ) {
			await this.alertService.presentAlert( {
				header : 'Fallo al cargar los mensajes',
				message: `Intente nuevamente`,
				buttons: [
					{
						text   : 'Devolverse',
						handler: async () => {
							await this.router.navigate( [ '/tabs/home' ] )
						}
					}
				]
			} )
		}
		else {
			this.chatID         = chatID
			this.tripID         = tripID
			this.messagesChange = messageStream.unwrap()
			                                   .subscribe( ( message ) => {
				                                   if ( message !== null ) {
					                                   this.messages.push( message )
					                                   this.messages.sort(
						                                   ( a, b ) => a.timestamp -
							                                   b.timestamp )
				                                   }
			                                   } )
		}
		this.loading = false
	}

	async ngOnDestroy(): Promise<void> {
		await this.chatService.close( this.chatID! )
		this.messagesChange.unsubscribe()
	}

	async onBackClicked(): Promise<void> {
		await this.router.navigate( [ '/trip-details' ], {
			state: {
				id: this.tripID
			}
		} )
	}

	async send( $event: MouseEvent ): Promise<void> {
		if ( this.inputTextValue.trim() === '' ) {
			return
		}
		this.sendingText = true
		const result     = await this.chatService.sendMessage( this.chatID!, {
			content          : this.inputTextValue,
			passengerName    : this.passengerOwner.name,
			passengerLastName: this.passengerOwner.lastName,
			passengerEmail   : this.passengerOwner.email
		} )

		if ( result.isErr() ) {
			console.log( 'error send msg' )
			console.log( result.unwrapErr() )
			await this.toastService.presentToast( {
				message : 'Hubo un problema al enviar el mensaje. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
		else {
			this.inputTextValue = ''
		}
		this.sendingText = false
	}
}
