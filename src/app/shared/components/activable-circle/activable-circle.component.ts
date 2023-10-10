import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { IonicModule } from '@ionic/angular'
import { ulid } from 'ulidx'

@Component( {
  standalone : true,
  selector   : 'app-activable-circle',
  templateUrl: './activable-circle.component.html',
  styleUrls  : [ './activable-circle.component.scss' ],
  imports: [
    IonicModule,
    CommonModule,
    MatIconModule
  ]
} )
export class ActivableCircleComponent implements OnInit, OnChanges{
  constructor() {}

  public ngOnChanges( changes: SimpleChanges ): void {
    this.iconName = changes['isActive'].currentValue ? this.iconNames[1] : this.iconNames[0]
  }

  id = ulid()
  @Input({required:true}) iconNames : string[]
  @Input({required:true}) color : string
  iconName : string = ''
  @Input() isActive: boolean = false

  @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  public ngOnInit(): void {
    console.log('this.color')
    console.log(this.color)
    this.iconName = this.iconNames[0]
    this.isActive = false
    //TODO: problema de color
  }

  @HostListener( 'document:click', [ '$event' ] )
  handleClick( event: MouseEvent ) {
    if ( event.target instanceof HTMLCanvasElement ) {
      return
    }
    if ( event.target instanceof Element ) {
      if ( event.target.id === this.id ) {
        this.isActive = !this.isActive
        // this.iconName = this.isActive ? 'location_on' : 'edit_location'
        this.iconName = this.isActive ? this.iconNames[1] : this.iconNames[0]
        this.isActiveChange.emit( this.isActive )
        return
      }
    }
    this.isActive = false
  }

  onClick() {}
}
