import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ulid } from 'ulidx'

@Component( {
  standalone : true,
  selector   : 'app-activable-circle',
  templateUrl: './activable-circle.component.html',
  styleUrls  : [ './activable-circle.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class ActivableCircleComponent {
  constructor() {}

  id = ulid()

  @Input() isActive: boolean = false

  @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  @HostListener( 'document:click', [ '$event' ] )
  handleClick( event: MouseEvent ) {
    if ( event.target instanceof HTMLCanvasElement ) {
      return
    }
    if ( event.target instanceof HTMLDivElement ) {
      if ( event.target.id === this.id ) {
        this.isActive = !this.isActive
        this.isActiveChange.emit( this.isActive )
      }
    }
  }

  onClick() {}
}
