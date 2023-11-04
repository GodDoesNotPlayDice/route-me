import { CommonModule } from '@angular/common'
import {
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { send } from 'ionicons/icons'
import { Observable } from 'rxjs'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { BubbleChatComponent } from 'src/app/shared/components/bubble-chat/bubble-chat.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChatService } from 'src/app/shared/services/chat.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UrlService } from 'src/app/shared/services/url.service'
import { Message } from 'src/package/message/domain/models/message'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

@Component( {
	standalone : true,
	selector   : 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls  : [ './chat.page.scss' ],
	imports: [
		IonicModule,
		CommonModule,
		BubbleChatComponent,
		AppBarCloneComponent,
		FormsModule
	]
} )
export class ChatPage implements OnInit, OnDestroy {

	constructor( private urlService: UrlService,
		private chatService: ChatService,
		private toastService: ToastService,
		private authService: AuthService,
		private alertService: AlertService,
		private router: Router
	) {}

	prevHref: string      = '/tabs/home'
	loading: boolean      = false
	messages: Message[]   = []
	tripID: string | null = null
	chatID: string | null = null
	messagesStream$: Observable<Message | null>
	passengerOwner : Passenger
	inputTextValue : string = ''
	sendingText : boolean = false
	firstSort : boolean = false

	async ngOnInit(): Promise<void> {
		this.passengerOwner = this.authService.currentPassenger.unwrap()
		this.urlService.previousUrl$.subscribe( ( url ) => {
			this.prevHref = url
		} )

		this.loading = true
		const state  = this.router.getCurrentNavigation()?.extras.state
		const chatID = state?.['chatID'] ?? null
		const tripID = state?.['tripID'] ?? null
		if ( chatID === null || tripID === null ) {
			await this.router.navigate( [ '/tabs/home' ] )
			return
		}

		const chatResult = await this.chatService.getById( chatID)

		const messageStream = await this.chatService.listen( chatID)

		if ( chatResult.isErr() || messageStream.isErr() ) {
			await this.alertService.presentAlert( {
				header : 'Fallo al cargar los mensajes',
				message: `Intente nuevamente`,
				buttons: [
					{
						text   : 'Devolverse',
						handler: async () => {
							await this.router.navigate( [ this.prevHref ] )
						}
					}
				]
			} )
		}
		else {
			this.chatID					= chatID
			this.tripID					= tripID
			//TODO: agregar fecha envio, apellido y respetar espacio chat list y input
			this.messagesStream$ = messageStream.unwrap()
			this.messagesStream$.subscribe( ( message ) => {
				if ( message !== null ) {
					this.messages.push( message )
					this.messages.sort( ( a, b ) => a.timestamp - b.timestamp )
				}
			} )
		}
		this.loading = false
	}

	async ngOnDestroy(): Promise<void> {
		await this.chatService.close()
	}

	async onBackClicked(): Promise<void> {
		await this.router.navigate( [ this.prevHref ], {
			state: {
				id: this.tripID
			}
		} )
	}

	async send( $event: MouseEvent ): Promise<void> {
		if ( this.inputTextValue.trim() === '' ) return
		this.sendingText = true
		const result = await this.chatService.sendMessage(this.chatID!, {
			content: this.inputTextValue,
			passengerName: this.passengerOwner.name,
			passengerEmail: this.passengerOwner.email
		})

		if ( result.isErr() ){
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
