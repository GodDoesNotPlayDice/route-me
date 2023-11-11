import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	OnDestroy,
	ViewChild
} from '@angular/core'
import { Router } from '@angular/router'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { Subscription } from 'rxjs'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { transformLocationName } from 'src/app/shared/pipes/parse-location-name.pipe'
import { CurrencyService } from 'src/app/shared/services/currency.service'
import { MapService } from 'src/app/shared/services/map.service'
import { NearTripService } from 'src/app/shared/services/near-trip.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Position } from 'src/package/position-api/domain/models/position'
import { Street } from 'src/package/street-api/domain/models/street'

@Component( {
	standalone : true,
	selector   : 'app-search',
	templateUrl: './search.page.html',
	styleUrls  : [ './search.page.scss' ],
	imports    : [
		IonicModule,
		CommonModule,
		SearchInputComponent,
		InputTextComponent,
		SearchLauncherComponent
	]
} )
export class SearchPage implements ViewDidEnter, OnDestroy {
	constructor(
		private router: Router,
		private currencyService: CurrencyService,
		private map: MapService,
		private toastService: ToastService,
		private positionService: PositionService,
		private nearTripService: NearTripService
	)
	{}

	@ViewChild( 'search' ) searchInput!: SearchInputComponent
	@ViewChild( 'smap' ) divElementElementRef!: ElementRef<HTMLDivElement>

	locationText            = ''
	private pageKey: string = 'search'
	private positionChange: Subscription
	userFocus: boolean      = false

	async ionViewDidEnter(): Promise<void> {

		await this.map.init( this.pageKey, this.divElementElementRef.nativeElement )
		this.userFocus      = true
		this.positionChange =
			this.positionService.newPosition$.subscribe( async ( value ) => {
				if ( value == null ) { return }
				await this.map.addUserMarker( this.pageKey )
				if ( this.userFocus ) {
					await this.map.autoFollow( this.pageKey, value )
				}
			} )
		if ( this.positionService.lastPosition !== null ) {
			await this.setNearTripsMarkers( this.positionService.lastPosition )
		}
		else {
			await this.toastService.presentToast( {
				message : 'Hubo un problema en la busqueda de viajes cercanos. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
	}

	private async setNearTripsMarkers( center: Position ): Promise<boolean> {
		const resultInitTrips = await this.nearTripService.getNearTrips( center,
			10 )
		if ( resultInitTrips.isErr() ) {
			console.log( 'resultInitTrips', resultInitTrips )
			return false
		}
		else {
			const currencyResult = await this.currencyService.fetchCurrency()

			if ( currencyResult.isOk() ) {
				for ( const nearTrip of resultInitTrips.unwrap() ) {
					const passengerLength = nearTrip.passengersImages.map(
						( val ) => val.value !== '' ).length
					const targetAmount    = this.currencyService.parseCurrency(
						nearTrip.price.amount.value,
						currencyResult.unwrap() )

					await this.map.removeAllMarkersInMap( this.pageKey )
					await this.map.addRouteMarker( this.pageKey, nearTrip.id.value, {
						lat: nearTrip.latitude,
						lng: nearTrip.longitude
					}, 'orange', `
<div class="flex flex-col items-center">
	<div>Desde: ${ transformLocationName( nearTrip.startLocationName.value ) }</div>
	<div>Hacia: ${ transformLocationName( nearTrip.endLocationName.value ) }</div>
	<div>Valor: ${ targetAmount } ${ currencyResult.unwrap().currency }</div>
	<div>Fecha Inicio: ${ nearTrip.startDate.toLocaleString() }</div>
	<div>Asientos ocupados ${ passengerLength }/${ nearTrip.seat.value - 1 }</div>
	<button class="text-red-500" id="${ nearTrip.id.value }">
		Ir al viaje
	</button>
</div>
`, ( toggleMarker ) => {

						const boton = document.getElementById( nearTrip.id.value )
						if ( boton ) {
							boton.addEventListener( 'click', async () => {
								console.log( 'button navigate. search page' )
								toggleMarker()
								await this.router.navigate( [ '/trip-details' ],
									{
										state: {
											id: nearTrip.id.value
										}
									} )
							} )
						}
						else {
							console.log( 'err button search page' )
						}
					} )
				}
				return true
			}
			else {
				console.log( 'currencyResult err. search page',
					currencyResult.unwrapErr() )
				return false
			}
		}
	}

	async ngOnDestroy(): Promise<void> {
		await this.map.removeRouteMarker( this.pageKey, 'search-focus' )
		await this.map.removeMap( this.pageKey )
		this.positionChange.unsubscribe()
	}

	async onStreetPosition( $event: Street ): Promise<void> {
		const result = await this.setNearTripsMarkers( $event.center )
		if ( !result ) {
			await this.toastService.presentToast( {
				message : 'Hubo un problema en la busqueda en lugar solicitado. Intente denuevo',
				duration: 1500,
				position: 'bottom'
			} )
		}
		else {
			this.userFocus = false
			await this.map.autoFollow( this.pageKey, $event.center )
			await this.map.addRouteMarker( this.pageKey, 'search-focus', $event.center, 'green' )
		}
	}
}
