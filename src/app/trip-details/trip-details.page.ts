import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnDestroy,
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
import { Subscription } from 'rxjs'
import { ActivableCircleComponent } from 'src/app/shared/components/activable-circle/activable-circle.component'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component'
import { DividerComponent } from 'src/app/shared/components/divider/divider.component'
import { ItemListComponent } from 'src/app/shared/components/item-list/item-list.component'
import { ListViewModalComponent } from 'src/app/shared/components/list-view-modal/list-view-modal.component'
import { ParseLocationNamePipe } from 'src/app/shared/pipes/parse-location-name.pipe'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { DriverService } from 'src/app/shared/services/driver.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { MapService } from 'src/app/shared/services/map.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripInProgressService } from 'src/app/shared/services/trip-in-progress.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'
import { ulid } from 'ulidx'

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
		MatMenuModule,
		ActivableCircleComponent
	],
	styleUrls  : [ './trip-details.page.scss' ]
} )
export class TripDetailsPage implements OnInit, ViewDidEnter, OnDestroy {
	constructor(
		private map: MapService,
		private modalController: ModalController,
		private tripService: TripService,
		private tripInProgressService: TripInProgressService,
		private driverService: DriverService,
		private positionService: PositionService,
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
	isTripFull: boolean                = false
	isTripStarted: boolean             = false
	isTripFinished: boolean            = false
	isPendingInPassengerQueue: boolean = false
	private tripChange: Subscription
	//TODO: si queremos marcar la posicion del pasajero visualizador
	private positionChange: Subscription

	private pageKey: string = 'detail'

	async ionViewDidEnter(): Promise<void> {
		await this.map.init( this.pageKey, this.divElementElementRef.nativeElement )

		this.positionChange =
			this.positionService.newPosition$.subscribe( async ( value ) => {
				if ( value == null ) { return }
				await this.map.autoFollow( this.pageKey, value )
			} )

		if ( this.trip ) {
			const result1 = await this.map.addRouteMarker( this.pageKey, ulid(),
				this.trip.startLocation.position, 'red' )
			const result2 = await this.map.addRouteMarker( this.pageKey, ulid(),
				this.trip.endLocation.position, 'orange' )
			await this.checkTripInProgress()
		}
	}

	private async checkTripInProgress(): Promise<void> {
		if ( this.trip && this.isTripStarted ) {
			const listenResult = await this.tripInProgressService.listen(
				this.trip.id.value )
			if ( listenResult.isErr() ) {
				console.log( 'trip listen error. details' )
				console.log( listenResult.unwrapErr() )
				return
			}

			const resultRoute = await this.map.addRouteMap( this.pageKey,
				this.trip.startLocation.position,
				this.trip.endLocation.position )
			console.log( 'resultRoute', resultRoute )

			this.tripChange = listenResult.unwrap()
			                              .subscribe( async ( value ) => {
				                              if ( value === null ) {
					                              return
				                              }
				                              await this.map.addUserMarker(
					                              'detail', {
						                              lat: value.latitude,
						                              lng: value.longitude
					                              }, 'blue'
				                              )
			                              } )
		}
	}

	async ngOnDestroy(): Promise<void> {
		await this.map.removeMap( 'detail' )
		this.tripChange.unsubscribe()
		this.positionChange.unsubscribe()
		await this.tripInProgressService.close(this.trip!.id)
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
				header         : 'Fallo al cargar el viaje',
				message        : `Intente nuevamente`,
				backdropDismiss: false,
				buttons        : [
					{
						text   : 'Devolverse',
						handler: async () => {
							await this.router.navigate( [ '/tabs/home' ] )
						}
					}
				]
			} )
			return
		}
		this.trip = result.unwrap()

		if ( this.trip.state === TripStateEnum.Progress ) {
			this.isTripStarted = true
		}
		else if ( this.trip.state === TripStateEnum.Completed ) {
			this.isTripFinished = true
		}

		if ( this.trip.passengers.length >=
			this.trip.driver.driverCar.seat.value )
		{
			this.isTripFull = true
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

		//TODO: verificaciones como estas deberian ir en backend
		const thisPassenger = this.authService.currentPassenger.unwrap()

		const isPassengerInQueue = this.trip.queuePassengers.some(
			( passenger ) => {
				return passenger.email.value === thisPassenger.email.value
			} )

		const isPassengerInPassengers = this.trip.passengers.some(
			( passenger ) => {
				return passenger.email.value === thisPassenger.email.value
			} )

		if ( isPassengerInQueue || isPassengerInPassengers ) {
			await this.toastService.presentToast( {
				message : 'Ya estas en el viaje',
				duration: 1500,
				position: 'bottom'
			} )
			return
		}

		await this.loadingService.showLoading( 'Uniendo al viaje' )
		const result = await this.tripService.updateTrip( this.trip, {
			queuePassengers: [ ...this.trip.queuePassengers, thisPassenger ]
		} )
		await this.loadingService.dismissLoading()

		if ( result.isSome() ) {
			this.isPendingInPassengerQueue = true
			this.trip                      = result.unwrap()
			await this.toastService.presentToast( {
				message : 'Te has unido al viaje',
				color   : 'success',
				duration: 1500,
				position: 'bottom'
			} )
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

			if ( this.trip.passengers.length >=
				this.trip.driver.driverCar.seat.value )
			{
				this.isTripFull = true
			}
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
			this.userInTrip                = false
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

	async onStartTrip(): Promise<void> {
		if ( this.trip === null ) {
			return
		}

		await this.loadingService.showLoading( 'Iniciando Viaje' )
		const result = await this.tripService.updateTrip( this.trip, {
			queuePassengers: [],
			state          : TripStateEnum.Progress
		} )
		if ( result.isSome() ) {
			this.trip = result.unwrap()
			await this.checkTripInProgress()
			const resultDriver     = await this.driverService.driverUpdate( {
				activeTrip: result.unwrap()
			} )
			const resultTripDriver = await this.tripService.updateTrip( this.trip, {
				driver: resultDriver.unwrap()
			} )
			if ( resultDriver.isSome() && resultTripDriver.isSome() ) {
				this.trip = resultTripDriver.unwrap()

				await this.toastService.presentToast( {
					message : 'Se iniciado el viaje',
					color   : 'success',
					duration: 1500,
					position: 'bottom'
				} )
				this.trip          = result.unwrap()
				this.isTripStarted = true
				await this.loadingService.dismissLoading()
				return
			}
		}
		await this.toastService.presentToast( {
			message : 'Hubo un problema. Intente denuevo',
			duration: 1500,
			position: 'bottom'
		} )
		await this.loadingService.dismissLoading()
	}

	async finishTrip(): Promise<void> {
		if ( this.trip === null ) {
			return
		}
		await this.loadingService.showLoading( 'Terminando Viaje' )
		const resultDriver = await this.driverService.driverUpdate( {
			activeTrip: undefined
		} )
		if ( resultDriver.isSome() ) {
			const result = await this.tripService.updateTrip( this.trip, {
				state : TripStateEnum.Completed,
				driver: resultDriver.unwrap()
			} )
			if ( result.isSome() ) {
				const removeResult = await this.tripInProgressService.removeTripInProgress(
					this.trip.id )
				this.tripChange.unsubscribe()

				await this.toastService.presentToast( {
					message : 'Se terminado el viaje',
					color   : 'success',
					duration: 1500,
					position: 'bottom'
				} )
				this.isTripFinished = true

				this.trip = result.unwrap()
				await this.loadingService.dismissLoading()
				return
			}
		}

		await this.toastService.presentToast( {
			message : 'Hubo un problema. Intente denuevo',
			duration: 1500,
			position: 'bottom'
		} )
		await this.loadingService.dismissLoading()
	}

	async onReportPassenger( psn: Passenger ): Promise<void> {

	}
}
