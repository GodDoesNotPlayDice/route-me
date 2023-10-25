import { CommonModule } from '@angular/common'
import {
	Component,
	ElementRef,
	ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import {
	IonicModule,
	ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DateTimeSelectorComponent } from 'src/app/shared/components/date-time-selector/date-time-selector.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MapLocationInputComponent } from 'src/app/shared/components/map-location-input/map-location-input.component'
import { AlertService } from 'src/app/shared/services/alert.service'
import { MapService } from 'src/app/shared/services/map.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TripService } from 'src/app/shared/services/trip.service'

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
		DateTimeSelectorComponent
	]
} )
export class PublishPage implements ViewDidEnter {

	constructor( private map: MapService,
		private toastService: ToastService,
		private tripService: TripService,
		private alertService: AlertService )
	{}

	@ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
	@ViewChild( 'date' ) dateInput!: DateTimeSelectorComponent
	@ViewChild( 'salida' ) salidaInput!: MapLocationInputComponent
	@ViewChild( 'inicio' ) inicioInput!: MapLocationInputComponent

	formGroup!: FormGroup
	pageKey        = 'publish'
	first: boolean = true

	async ionViewDidEnter(): Promise<void> {
		await this.map.init( this.pageKey, this.divElementElementRef.nativeElement )

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
	}

	async addRoute() {
		const start = this.inicioInput.mapLocationControl.value!
		const end   = this.salidaInput.mapLocationControl.value!
		//TODO: result error en agregar path a mapa
		const dir   = await this.map.addRouteMap( this.pageKey, start.center,
			end.center )
		if ( dir.isNone() ) {
			console.log( 'error. add route. publish page' )
		}
		const a = await this.tripService.calculateTripPrice( dir.unwrap().distance )
		console.log( 'a', a )
	}

	async onPublish(): Promise<void> {
		this.formGroup.updateValueAndValidity()
		this.formGroup.markAllAsTouched()

		if ( !this.formGroup.valid ) { return }

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

	private async reset(): Promise<void> {
		await this.map.removeRouteMap( this.pageKey )
		await this.map.removeRouteMarker( this.pageKey, this.inicioInput.id )
		await this.map.removeRouteMarker( this.pageKey, this.salidaInput.id )
		this.formGroup.reset()
		await this.dateInput.reset()
		this.inicioInput.reset()
		this.salidaInput.reset()
	}
}
