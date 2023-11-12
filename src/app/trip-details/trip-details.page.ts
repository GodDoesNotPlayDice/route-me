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
import { RatingModalComponent } from 'src/app/shared/components/rating-modal/rating-modal.component'
import { ReportModalComponent } from 'src/app/shared/components/report-modal/report-modal.component'
import { ParseLocationNamePipe } from 'src/app/shared/pipes/parse-location-name.pipe'
import { AlertService } from 'src/app/shared/services/alert.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { DriverService } from 'src/app/shared/services/driver.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { MapService } from 'src/app/shared/services/map.service'
import { NearTripService } from 'src/app/shared/services/near-trip.service'
import { PassengerTripService } from 'src/app/shared/services/passenger-trip.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { ReportService } from 'src/app/shared/services/report.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripHistoryService } from 'src/app/shared/services/trip-history.service'
import { TripInProgressService } from 'src/app/shared/services/trip-in-progress.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { Report } from 'src/package/report/domain/models/report'
import { newTripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'
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
		private reportService: ReportService,
		private modalCtrl: ModalController,
		private nearTripService: NearTripService,
		private map: MapService,
		private tripHistoryService: TripHistoryService,
		private passengerTripService: PassengerTripService,
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
		await this.tripInProgressService.close( this.trip!.id )
	}

	private returnPath: string = '/tabs/home'

	async ngOnInit(): Promise<void> {
		this.loading = true
		const state  = this.router.getCurrentNavigation()?.extras.state
		const id     = state?.['id'] ?? null
		if ( id === null ) {
			await this.router.navigate( [ this.returnPath ] )
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
							await this.router.navigate( [ this.returnPath ] )
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

		if ( this.userInTrip || this.isDriver){
			const reportedResult = await this.reportService.getByFromEmail(this.authService.currentPassenger.unwrap().email)
			if (reportedResult.isOk()){
				this.reportedUsers = reportedResult.unwrap()

			}
			else {
				console.log('error reported from user. trip detail')
				console.log(reportedResult.unwrapErr())
			}
		}

		this.loading = false
	}

	reportedUsers : Report[] = []

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

		if ( result.isSome() ) {
			const ptResult = await this.passengerTripService.create( {
				tripID   : result.unwrap().id,
				state    : result.unwrap().state,
				userEmail: this.authService.currentPassenger.unwrap().email
			} )
			if ( ptResult.isErr() ) {
				await this.toastService.presentToast( {
					message : 'Hubo un problema. Intente denuevo',
					duration: 1500,
					position: 'bottom'
				} )
				await this.loadingService.dismissLoading()
				return
			}

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
		await this.loadingService.dismissLoading()
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

		if ( result.isSome() ) {
			await this.passengerTripService.deleteAll( psn.email,
				TripStateEnum.Open )

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
		await this.loadingService.dismissLoading()
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

		if ( result.isSome() ) {
			const deleteResult = await this.passengerTripService.delete(
				result.unwrap().id, this.authService.currentPassenger.unwrap().email )

			if ( deleteResult.isErr() ) {
				await this.toastService.presentToast( {
					message : 'Hubo un problema. Intente denuevo',
					duration: 1500,
					position: 'bottom'
				} )
				await this.loadingService.dismissLoading()
				return
			}

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
		await this.loadingService.dismissLoading()

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
		console.log( '------------------------------' )
		console.log( 'tablas involucradas, trip, passengerTrip, nearTrip, driver' )
		console.log( '------------------------------' )
		if ( result.isSome() ) {
			this.trip = result.unwrap()
			console.log( 'pre update' )
			const psnResult = await this.passengerTripService.getByID( this.trip.id )

			if ( psnResult.isErr() ) {
				console.log( 'psnResult', psnResult.unwrapErr() )
			}
			else {
				for ( const passengerTrip of psnResult.unwrap() ) {
					const updatePsnResult = await this.passengerTripService.update(
						passengerTrip, TripStateEnum.Progress )
					if ( updatePsnResult.isErr() ) {
						console.log( 'updatePsnResult err', updatePsnResult.unwrapErr() )
					}
				}
			}
			console.log( 'post update' )

			const nearTripDelete = await this.nearTripService.delete( this.trip.id )
			if ( nearTripDelete.isErr() ) {
				console.log( 'nearTripDelete', nearTripDelete.unwrapErr() )
			}
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
		//TODO: intentar reducir lectura de codigo
		if ( resultDriver.isSome() ) {
			const result = await this.tripService.removeTrip( this.trip.id )

			if ( result.isErr() ) {
				console.log( 'result err finish trip', result.unwrapErr() )
			}

			if ( result ) {
				this.trip.state           = TripStateEnum.Completed
				const driverHistoryResult = await this.tripHistoryService.create( {
					trip     : this.trip,
					userEmail: resultDriver.unwrap().passenger.email,
					id       : newTripHistoryID( {
						value: ulid()
					} )
						.unwrap()
				} )
				if ( driverHistoryResult.isErr() ) {
					console.log( 'driverHistoryResult', driverHistoryResult.unwrapErr() )
				}

				const passengerTripProgressDeleteErrors: Error[] = []
				for ( let passenger of this.trip.passengers ) {
					const passengerTripProgressDeleteResult = await this.passengerTripService.delete(
						this.trip.id, passenger.email )
					const historyResult                     = await this.tripHistoryService.create(
						{
							trip     : this.trip,
							userEmail: passenger.email,
							id       : newTripHistoryID( {
								value: ulid()
							} )
								.unwrap()
						} )
					if ( historyResult.isErr() ) {
						console.log( 'passengerHistoryResult', historyResult.unwrapErr() )
					}
					if ( passengerTripProgressDeleteResult.isErr() ) {
						passengerTripProgressDeleteErrors.push(
							passengerTripProgressDeleteResult.unwrapErr() )
					}
				}

				if ( passengerTripProgressDeleteErrors.length > 0 ) {
					console.log( 'passengerTripProgressDeleteErrors',
						passengerTripProgressDeleteErrors )
					await this.toastService.presentToast( {
						message : 'Hubo un problema. Intente denuevo',
						duration: 1500,
						position: 'bottom'
					} )
					await this.loadingService.dismissLoading()
					return
				}

				const removeResult = await this.tripInProgressService.removeTripInProgress(
					this.trip.id )
				if ( removeResult.isErr() ) {
					console.log( 'remove trip in progress result',
						removeResult.unwrapErr() )
				}
				this.isTripFinished = true
				this.trip           = null
				await this.loadingService.dismissLoading()
				await this.router.navigate( [ this.returnPath ] )
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
		const modal = await this.modalCtrl.create( {
			component     : ReportModalComponent,
			componentProps: {
				fromEmail: this.authService.currentPassenger.unwrap().email,
				toEmail: psn.email
			}
		} )
		await modal.present()

		const { data, role } = await modal.onWillDismiss()
	}

	async onRatingPassenger( psn: Passenger ): Promise<void> {
		const modal = await this.modalCtrl.create( {
			component     : RatingModalComponent,
			componentProps: {
				fromEmail: this.authService.currentPassenger.unwrap().email,
				toEmail: psn.email
			}
		} )
		await modal.present()

		const { data, role } = await modal.onWillDismiss()
	}
}
