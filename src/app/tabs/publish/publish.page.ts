import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { Subscription } from 'rxjs'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DateTimeSelectorComponent } from 'src/app/shared/components/date-time-selector/date-time-selector.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MapLocationInputComponent } from 'src/app/shared/components/map-location-input/map-location-input.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { DriverService } from 'src/app/shared/services/driver.service'
import { LocationService } from 'src/app/shared/services/location.service'
import { MapService } from 'src/app/shared/services/map.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { CurrencyDao } from 'src/package/currency-api/domain/dao/currency-dao'
import { IpDao } from 'src/package/ip-api/domain/dao/ip-dao'
import { newMoney } from 'src/package/shared/domain/models/money'
import { KilometerPricing } from 'src/package/trip/shared/kilometer-pricing'

@Component( {
	standalone : true,
	selector   : 'app-publish',
	templateUrl: './publish.page.html',
	styleUrls  : [ './publish.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		InputTextComponent,
		AdaptativeButtonComponent,
		MapLocationInputComponent,
		DateTimeSelectorComponent,
		MatIconModule,
		MatButtonModule
	]
} )
export class PublishPage implements ViewDidEnter, OnDestroy {

	constructor( private map: MapService,
		private toastService: ToastService,
		private tripService: TripService,
		private router: Router,
		private driverService: DriverService,
		private positionService: PositionService,
		private ipDao: IpDao,
		private currencyDao: CurrencyDao,
		private alertService: AlertService )
	{}

	@ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
	@ViewChild( 'date' ) dateInput!: DateTimeSelectorComponent
	@ViewChild( 'salida' ) salidaInput!: MapLocationInputComponent
	@ViewChild( 'inicio' ) inicioInput!: MapLocationInputComponent

	formGroup!: FormGroup
	pageKey                       = 'publish'
	first: boolean                = true
	distance: number | null       = null
	simulatedPrice: string | null = null
	loadingPrice: boolean         = false
	canPublish: boolean           = true
	private positionChange: Subscription

	async ngOnDestroy(): Promise<void> {
		await this.map.removeMap(this.pageKey)
		this.positionChange.unsubscribe()
	}

	async ionViewDidEnter(): Promise<void> {
		await this.map.init( this.pageKey, this.divElementElementRef.nativeElement )

		this.positionChange = this.positionService.newPosition$.subscribe( async ( value ) => {
			if ( value == null ) { return }
			await this.map.autoFollow(this.pageKey,value)
			await this.map.addUserMarker( this.pageKey)
		})


		this.canPublish = this.driverService.currentDriver.unwrap()
		                      .activeTrip
		                      .isNone()

		if ( !this.canPublish ) {
			await this.alertService.presentAlert( {
				header         : 'Advertencia',
				backdropDismiss: false,
				message        : 'Ya tienes un viaje activo',
				buttons        : [ {
					text   : 'Volver al inicio',
					handler: async () => {
						await this.router.navigate( [ '/tabs/home' ] )
					}
				},
					{
						text   : 'Ir al viaje activo',
						handler: async () => {
							await this.router.navigate( [ '/trip-details' ],
								{
									state: {
										id: this.driverService.currentDriver.unwrap()
										        .activeTrip
										        .unwrap().id.value
									}
								} )
						}
					}
				]
			} )
		}

		this.formGroup = new FormGroup( {
			date : this.dateInput.dateControl,
			start: this.salidaInput.mapLocationControl,
			end  : this.inicioInput.mapLocationControl
		}, ( control ) => {
			if ( control.value.start !== null && control.value.end !== null ) {
				this.addRoute()
			}
			return null
		} )

		await this.map.autoFollow(this.pageKey)
	}

	async addRoute() {
		const start = this.inicioInput.mapLocationControl.value!
		const end   = this.salidaInput.mapLocationControl.value!
		const dir   = await this.map.addRouteMap( this.pageKey, start.center,
			end.center )
		if ( dir.isErr() ) {
			console.log( 'error. add route. publish page' )
			console.log( dir.unwrapErr() )
		}
		else {
			this.loadingPrice    = true
			const resultIP       = await this.ipDao.getIp()
			const resultCurrency = await this.currencyDao.getCurrencyExchange(
				'USD',
				resultIP.unwrap().currency
			)
			this.distance        =
				+( dir.unwrap().distance.value / 1000 ).toFixed( 3 )
			const amountUSD      = new KilometerPricing( newMoney( { value: 0.35 } )
				.unwrap(), this.distance ).calculate()
			const targetAmount   = amountUSD * resultCurrency.unwrap().value
			this.simulatedPrice  = new Intl.NumberFormat(
				resultIP.unwrap().languages[0], {
					style   : 'currency',
					currency: resultIP.unwrap().currency
				} ).format( targetAmount )
			this.loadingPrice    = false
		}
	}

	async onPublish(): Promise<void> {
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if ( !
			this.formGroup.valid
		)
		{ return }

		await this.alertService.presentAlert( {
			header : 'Confirma que deseas publicar el viaje',
			message: `El viaje comenzara: ${ this.dateInput.dateControl.value!.toLocaleString() }`,
			buttons: [
				{
					text: 'Cancelar'
				},
				{
					text   : 'Publicar',
					handler: async () => {
						const result = await this.tripService.create( {
							endLocation  : this.salidaInput.mapLocationControl.value!,
							distance     : this.distance!,
							startLocation: this.inicioInput.mapLocationControl.value!,
							startDate    : this.dateInput.dateControl.value!
						} )
						if ( result ) {
							await this.toastService.presentToast( {
								message : 'Viaje creado con exito',
								duration: 1500,
								position: 'bottom'
							} )
							await this.reset()
						}
						else {
							await this.toastService.presentToast( {
								message : 'Hubo un problema en la creacion del viaje',
								duration: 1500,
								position: 'bottom'
							} )
						}
					}
				}
			]
		} )
	}

	private async reset()
		:
		Promise<void> {
		await this.map.removeRouteMap( this.pageKey )
		await this.map.removeRouteMarker( this.pageKey, this.inicioInput.id )
		await this.map.removeRouteMarker( this.pageKey, this.salidaInput.id )
		this.formGroup.reset()
		await this.dateInput.reset()
		this.inicioInput.reset()
		this.salidaInput.reset()
	}
}
