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
import { LocationService } from 'src/app/shared/services/location.service'
import { MapService } from 'src/app/shared/services/map.service'
import { StreetService } from 'src/app/shared/services/street.service'

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
    private street: StreetService,
    private location: LocationService,
    private alertController: AlertController )
  {}

  @ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
  @ViewChild( 'date' ) dateInput!: DateSelectorComponent
  @ViewChild( 'salida' ) salidaInput!: MapLocationInputComponent
  @ViewChild( 'inicio' ) inicioInput!: MapLocationInputComponent

  formGroup!: FormGroup
  pageKey        = 'publish'
  first: boolean = true

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

    // this.location.newPosition$.subscribe( async ( [ lat, lng ] ) => {
    //   if ( this.first ) {
    //     this.first     = false
    //     const response = await this.street.getStreet( 'hospital',
    //       { lat: lat, lng: lng } )
    //
    //     if ( response === undefined ) {
    //       return
    //     }
    //
    //     const features = Object.values( response )[2]
    //     console.log( 'features', features)
    //     for ( const feature of features ) {
    //       const { center, place_name, text } = features[0]
    //       console.log( 'center', center )
    //       console.log( 'place_name', place_name )
    //       console.log( 'text', text )
    //     }
    //   }
    // } )
  }

  async addRoute() {
    const start = this.inicioInput.mapLocationControl.value!
    const end     = this.salidaInput.mapLocationControl.value!
    await this.map.addRouteMap( this.pageKey,
      { lng: start.lng, lat: start.lat },
      { lng: end.lng, lat: end.lat } )
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
