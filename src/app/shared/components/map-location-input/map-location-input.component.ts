import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  ViewChild
} from '@angular/core'
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { ActivableCircleComponent } from 'src/app/shared/components/activable-circle/activable-circle.component'
import { FocusBlurDirective } from 'src/app/shared/directives/focus-blur.directive'
import { SelectInputDirective } from 'src/app/shared/directives/select-input.directive'
import { MapService } from 'src/app/shared/services/map.service'
import { Position } from 'src/package/location-api/domain/models/position'
import { ulid } from 'ulidx'

@Component( {
  standalone : true,
  selector   : 'app-map-location-input',
  templateUrl: './map-location-input.component.html',
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FocusBlurDirective,
    ActivableCircleComponent,
    SelectInputDirective
  ],
  styleUrls  : [ './map-location-input.component.scss' ]
} )
export class MapLocationInputComponent {

  @Input({required:true}) placeholder: string
  @Input({required:true}) pageKey: string
  isFocused: boolean = false
  locationText: string = ''

  id = ulid()

  @ViewChild( 'inputLocation' ) input!: HTMLInputElement

  constructor( private map: MapService ) {
    this.map.markerClick$.pipe()
        .subscribe(
          async ( position ) => {
            if ( position !== null && this.isFocused ) {
              const { lng, lat } = position
              this.locationText = `${ lng.toFixed( 4 ) }, ${ lat.toFixed( 4 ) }`
              this.map.addRouteMarker(this.pageKey, this.id, {
                lng: lng,
                lat: lat,
              })
              this.mapLocationControl.patchValue( position )
              this.mapLocationControl.markAllAsTouched()
              this.mapLocationControl.updateValueAndValidity()
              this.isFocused = false
            }
          } )
  }
  readonly mapLocationControl      = new FormControl<Position | null>( null, control => {
    if ( this.locationText.length  === 0 && control.value === null ) {
      return { required: true }
    }
    return null
  } )

  onActiveChange( $event: boolean ): void {
    this.isFocused = $event
  }
}
