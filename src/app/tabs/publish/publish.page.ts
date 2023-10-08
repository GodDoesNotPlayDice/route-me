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
import { DateSelectorComponent } from 'src/app/shared/components/date-selector/date-selector.component'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import { MapLocationInputComponent } from 'src/app/shared/components/map-location-input/map-location-input.component'
import { MapService } from 'src/app/shared/services/map.service'

@Component( {
  standalone : true,
  selector   : 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls  : [ './publish.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    InputTextComponent,
    DateSelectorComponent,
    AdaptativeButtonComponent,
    MapLocationInputComponent
  ]
} )
export class PublishPage implements ViewDidEnter {

  constructor( private map: MapService,
    private alertController: AlertController )
  {}

  @ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
  @ViewChild( 'date' ) dateInput!: DateSelectorComponent
  @ViewChild( 'salida' ) salidaInput!: MapLocationInputComponent
  @ViewChild( 'inicio' ) inicioInput!: MapLocationInputComponent

  formGroup!: FormGroup
  pageKey = 'publish'

  ionViewDidEnter(): void {
    this.map.init( this.pageKey, this.divElementElementRef.nativeElement )

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

    this.map.addRouteMap( this.pageKey,
      { lng: -71.533820, lat: -33.032320 },
      { lng: -71.535835, lat: -33.031377 } )

  }

  addRoute() {
    const [ lngStart, latStart ] = this.inicioInput.mapLocationControl.value!
    const [ lngEnd, latEnd ]     = this.salidaInput.mapLocationControl.value!
    this.map.addRouteMap( this.pageKey,
      { lng: lngStart, lat: latStart },
      { lng: lngEnd, lat: latEnd } )
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
          handler: () => {
            console.log( 'Publicado' )
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
}
