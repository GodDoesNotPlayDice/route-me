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
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { FocusBlurDirective } from 'src/app/shared/directives/focus-blur.directive'
import { SelectInputDirective } from 'src/app/shared/directives/select-input.directive'
import { MapService } from 'src/app/shared/services/map.service'
import { StreetService } from 'src/app/shared/services/street.service'
import { Street } from 'src/package/street-api/domain/models/street'
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
    SelectInputDirective,
    SearchLauncherComponent
  ],
  styleUrls  : [ './map-location-input.component.scss' ]
} )
export class MapLocationInputComponent {

  @Input({required:true}) placeholder: string
  @Input({required:true}) pageKey: string
  @Input({required:true}) color: string
  isFocused: boolean = false
  locationText: string = ''

  id = ulid()

  @ViewChild( 'inputLocation' ) input!: HTMLInputElement

  constructor( private map: MapService,
    private steetService: StreetService ) {
    this.map.markerClick$.pipe()
        .subscribe(
          async ( position ) => {
            if ( position !== null && this.isFocused ) {
              const result = await this.steetService.getStreetsByPosition( position)
              if ( result.isErr() ) {
                console.log( 'location input, street position error' )
                console.log( result.unwrapErr() )
                return
              }
              const street = result.unwrap().streets[0]
              this.locationText = street.place_name
              await this.map.addRouteMarker( this.pageKey, this.id, position, this.color )
              this.mapLocationControl.patchValue( street )
              this.mapLocationControl.markAllAsTouched()
              this.mapLocationControl.updateValueAndValidity()
              this.isFocused = false
            }
          } )
  }

  readonly mapLocationControl      = new FormControl<Street | null>( null, control => {
    if ( this.locationText.length  === 0 && control.value === null ) {
      return { required: true }
    }
    return null
  } )

  onActiveChange( $event: boolean ): void {
    this.isFocused = $event
  }

  async onStreetPosition( $event: Street ): Promise<void> {
    await this.map.addRouteMarker( this.pageKey, this.id, $event.center, this.color)
    this.mapLocationControl.patchValue( $event )
    this.mapLocationControl.markAllAsTouched()
    this.mapLocationControl.updateValueAndValidity()
    this.isFocused = false
  }
}
