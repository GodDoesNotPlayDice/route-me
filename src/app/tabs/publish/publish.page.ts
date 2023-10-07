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
    AdaptativeButtonComponent
  ]
} )
export class PublishPage implements ViewDidEnter {

  constructor( private map: MapService,
    private alertController: AlertController )
  {}

  @ViewChild( 'pmap' ) divElementElementRef!: ElementRef<HTMLDivElement>
  @ViewChild( 'date' ) dateInput!: DateSelectorComponent

  formGroup!: FormGroup

  ionViewDidEnter(): void {
    this.map.init( 'publish', this.divElementElementRef.nativeElement )

    this.formGroup = new FormGroup( [
      this.dateInput.dateControl,
    ] )

    console.log( this.dateInput.dateControl.value )
  }

  //TODO: cuando se haga click al boton publicar, deberia lanzar alerta de confirmacion
  async presentAlert() {
    const alert = await this.alertController.create( {
      header   : 'Confirma que deseas publicar el viaje',
      // subHeader: '',
      message  : `El viaje comenzara: ${this.dateInput.dateControl.value!.toLocaleString()}`,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Publicar',
          handler: () => {
            console.log('Publicado')
          }
        }
      ],
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
