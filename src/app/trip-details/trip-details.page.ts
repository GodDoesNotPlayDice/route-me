import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnInit,
	TemplateRef,
	ViewChild
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import {
	Router,
	RouterLink
} from '@angular/router'
import {
	IonicModule,
	ModalController,
	ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { ItemListComponent } from 'src/app/shared/components/item-list/item-list.component'
import { ListViewModalComponent } from 'src/app/shared/components/list-view-modal/list-view-modal.component'
import { ParseLocationNamePipe } from 'src/app/shared/pipes/parse-location-name.pipe'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { MapService } from 'src/app/shared/services/map.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { Trip } from 'src/package/trip/domain/models/trip'

@Component( {
	standalone : true,
	selector   : 'app-trip-details',
	templateUrl: './trip-details.page.html',
	imports    : [
		IonicModule,
		CommonModule,
		AdaptativeButtonComponent,
		DividerComponent,
		ItemListComponent,
		RouterLink,
		ParseLocationNamePipe,
		ListViewModalComponent,
		AppBarCloneComponent,
		AvatarComponent,
		MatIconModule,
		MatMenuModule
	],
	styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit, ViewDidEnter {

	constructor(
		private map: MapService,
		private modalController: ModalController,
		private tripService: TripService,
		private loadingService: LoadingService,
		private alertService: AlertService,
		private toastService: ToastService,
		private authService: AuthService,
		private router: Router )
	{}

	@ViewChild( 'dmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
	@ViewChild( 'queueModal' ) modalQueueContent: TemplateRef<ElementRef>
	@ViewChild( 'activeModal' ) modalActiveContent: TemplateRef<ElementRef>
	@ViewChild( 'appBar' ) appBarCloneComponent: AppBarCloneComponent
	trip: Trip | null                  = null
	loading: boolean                   = false
	userInTrip: boolean                = false
	isDriver: boolean                  = false
	isPendingInPassengerQueue: boolean = false

	async ionViewDidEnter(): Promise<void> {
		await this.map.init( 'detail', this.divElementElementRef.nativeElement )
	}

	async ngOnInit(): Promise<void> {
		this.loading = true
		const state  = this.router.getCurrentNavigation()?.extras.state
		const id     = state?.['id'] ?? null
		if ( id === null ) {
			await this.router.navigate( [ '/tabs/home' ] )
			return
		}

		const result = await this.tripService.getTripByID( {
			value: id
		} )

		if ( result.isErr() ) {
			await this.alertService.presentAlert( {
				header : 'Fallo al cargar el viaje',
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
			this.trip = result.unwrap()
		}

		const passengerEmail = this.authService.currentPassenger.unwrap().email.value
		this.userInTrip      =
			passengerEmail === this.trip?.driver.passenger.email.value
		this.isDriver        = this.userInTrip
		this.trip?.passengers.forEach( ( passenger ) => {
			if ( passenger.email.value === passengerEmail ) {
				this.userInTrip = true
			}
		} )
		this.trip?.queuePassengers.forEach( ( passenger ) => {
			if ( passenger.email.value === passengerEmail ) {
				this.isPendingInPassengerQueue = true
			}
		} )
		this.loading = false
	}

	async onChatClick(): Promise<void> {
		if ( this.trip === null ) {
			return
		}

		await this.router.navigate( [ '/chat' ], {
			state: {
				tripID: this.trip.id.value,
				chatID: this.trip.chatID.value
				// passengers : this.trip.passengers
			}
		} )
	}

	async queuePassengerModalClick(): Promise<void> {
		const modal = await this.modalController.create( {
			component     : ListViewModalComponent,
			componentProps: {
				projectedContent: this.modalQueueContent
			}
		} )
		await modal.present()

		const { data, role } = await modal.onWillDismiss()
		if ( data === undefined ) {
			return
		}
	}

	async onBackClicked(): Promise<void> {
		await this.appBarCloneComponent.backPage()
	}

	async activePassengerModalClick(): Promise<void> {
		const modal = await this.modalController.create( {
			component     : ListViewModalComponent,
			componentProps: {
				projectedContent: this.modalActiveContent
			}
		} )
		await modal.present()

		const { data, role } = await modal.onWillDismiss()
		if ( data === undefined ) {
			return
		}
	}

	async onJoinRequestTrip(): Promise<void> {
		if ( this.trip === null ) {
			return
		}

		await this.loadingService.showLoading( 'Uniendo al viaje' )
		const result = await this.tripService.updateTrip( this.trip, {
			queuePassengers: [ ...this.trip.queuePassengers,
				this.authService.currentPassenger.unwrap() ]
		} )
		await this.loadingService.dismissLoading()

		if ( result.isSome() ) {
			await this.toastService.presentToast( {
				message : 'Te has unido al viaje',
				color   : 'success',
				duration: 1500,
				position: 'bottom'
			} )
			this.isPendingInPassengerQueue = true
			this.trip                      = result.unwrap()
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}

	async onAcceptQueuePassenger( psn: Passenger ): Promise<void> {
		if ( this.trip === null ) {
			return
		}

		// if(this.trip.driver.carID.)

		const newListQueuePassengers = this.trip.queuePassengers.filter(
			( passenger ) => {
				return passenger.email.value !== psn.email.value
			} )

		await this.loadingService.showLoading( 'Aceptando pasajero' )
		const result = await this.tripService.updateTrip( this.trip, {
			passengers     : [ ...this.trip.passengers, psn ],
			queuePassengers: newListQueuePassengers
		} )
		await this.loadingService.dismissLoading()

		if ( result.isSome() ) {
			await this.toastService.presentToast( {
				message : 'Se ha aceptado al pasajero',
				color   : 'success',
				duration: 1500,
				position: 'bottom'
			} )
			this.isPendingInPassengerQueue = false
			this.userInTrip                = true
			this.trip                      = result.unwrap()
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}

	async onDeniedQueuePassenger( psn: Passenger ): Promise<void> {
		if ( this.trip === null ) {
			return
		}

		const newListQueuePassengers = this.trip.queuePassengers.filter(
			( passenger ) => {
				return passenger.email.value !== psn.email.value
			} )

		const newListPassengers = this.trip.passengers.filter( ( passenger ) => {
			return passenger.email.value !== psn.email.value
		} )

		await this.loadingService.showLoading( 'Rechazando pasajero' )
		const result = await this.tripService.updateTrip( this.trip, {
			passengers     : newListPassengers,
			queuePassengers: newListQueuePassengers
		} )
		await this.loadingService.dismissLoading()

		if ( result.isSome() ) {
			await this.toastService.presentToast( {
				message : 'Se ha aceptado al pasajero',
				color   : 'success',
				duration: 1500,
				position: 'bottom'
			} )
			this.isPendingInPassengerQueue = false
			this.userInTrip								= false
			this.trip = result.unwrap()
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}
}
