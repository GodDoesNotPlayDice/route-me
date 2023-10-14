import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import {
  AlertController,
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'
import { DateTimeSelectorComponent } from 'src/app/shared/components/date-time-selector/date-time-selector.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MapLocationInputComponent } from 'src/app/shared/components/map-location-input/map-location-input.component'
import { MapService } from 'src/app/shared/services/map.service'
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
    private tripService: TripService,
    private alertController: AlertController )
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
    const start  = this.inicioInput.mapLocationControl.value!
    const end    = this.salidaInput.mapLocationControl.value!
    const result = await this.map.addRouteMap( this.pageKey, start.center,
      end.center )
  }

  //TODO: cuando se haga click al boton publicar, deberia lanzar alerta de confirmacion
  async presentAlert() {
    const alert = await this.alertController.create( {
      header: 'Confirma que deseas publicar el viaje',
      // subHeader: '',
      message: `El viaje comenzara: ${ this.dateInput.dateControl.value!.toLocaleString() }`,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text   : 'Publicar',
          handler: async () => {
            const result = await this.tripService.create( {
              startName    : this.salidaInput.mapLocationControl.value!.place.value,
              endName      : this.salidaInput.mapLocationControl.value!.place.value,
              endPosition  : this.salidaInput.mapLocationControl.value!.center,
              startPosition: this.inicioInput.mapLocationControl.value!.center,
              startDate    : this.dateInput.dateControl.value!
            } )

            //TODO: no se puede agregar elementos a alert, por lo que usar loading y toast con mensaje
            if ( result ) {
              console.log( 'error publish' )
            }
            else {
              console.log( 'ok publish' )
            }

            //TODO: mandar post, dependiendo respuesta, resetear o mensaje error
            await this.reset()
          }
        }
      ]
    } )

    await alert.present()
  }

  async onPublish(): Promise<void> {
    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if ( !this.formGroup.valid ) { return }

    await this.presentAlert()
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
