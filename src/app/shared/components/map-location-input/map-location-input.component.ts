import { CommonModule } from '@angular/common'
import {
  Component,
  HostListener,
  Input,
  ViewChild
} from '@angular/core'
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { FocusBlurDirective } from 'src/app/shared/directives/focus-blur.directive'
import { MapService } from 'src/app/shared/services/map.service'
import { ulid } from 'ulidx'

@Component( {
  standalone : true,
  selector   : 'app-map-location-input',
  templateUrl: './map-location-input.component.html',
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FocusBlurDirective
  ],
  styleUrls  : [ './map-location-input.component.scss' ]
} )
export class MapLocationInputComponent {

  @Input({required:true}) placeholder: string
  id = ulid()
  isFocused: boolean = false
  locationText: string = ''
  @ViewChild( 'inputLocation' ) input!: HTMLInputElement


  constructor( private map: MapService ) {
    this.map.markerClick$.pipe()
        .subscribe(
          async ( location ) => {
            if ( this.locationText.length > 0 ) return
            if ( location !== null && this.isFocused ) {
              this.locationText = `${ location[ 0 ].toFixed( 4 ) }, ${ location[ 1 ].toFixed( 4 ) }`
              this.mapLocationControl.patchValue( location )
              this.mapLocationControl.markAllAsTouched()
              this.mapLocationControl.updateValueAndValidity()
              this.isFocused = true
            }
          } )
  }
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    if ( event.target instanceof HTMLCanvasElement ){
      return
    }
    if (  event.target instanceof HTMLInputElement ) {
      if ( event.target.id === this.id ) {
        this.isFocused = true
      }
      else{
        this.isFocused = false
      }
    }
  }
  readonly mapLocationControl      = new FormControl<[ lng: number , lat: number ] | null>( null, control => {
    if ( this.locationText.length  === 0 ) {
      return { required: true }
    }
    return null
  } )
}
