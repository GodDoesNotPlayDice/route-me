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
  ToastController,
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
    private toastController: ToastController,
    private tripService: TripService,
    private alertController: AlertController )
  {}

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

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

  //TODO: agregar alert service
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
              endLocation  : this.salidaInput.mapLocationControl.value!,
              startLocation: this.inicioInput.mapLocationControl.value!,
              startDate    : this.dateInput.dateControl.value!
            } )
            if ( result ) {
              await this.presentToast('Viaje creado con exito')
              await this.reset()
            }
            else {
              await this.presentToast('Hubo un problema en la creacion del viaje')
            }
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
