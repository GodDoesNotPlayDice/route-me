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
  imports    : [
    IonicModule,
    CommonModule,
    MatIconModule
  ]
} )
export class ActivableCircleComponent implements OnInit, OnChanges {
  constructor() {}

  public ngOnChanges( changes: SimpleChanges ): void {
    this.iconName = changes['isActive'].currentValue
      ? this.iconNameEnabled
      : this.iconNameDisabled
  }

  id                         = ulid()
  iconName: string           = ''
  @Input( { required: true } ) iconNameEnabled: string
  @Input( { required: true } ) iconNameDisabled: string
  @Input( { required: true } ) isRed: boolean
  @Input() isActive: boolean = false

  @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.iconName = this.iconNameDisabled
  }

  @HostListener( 'document:click', [ '$event' ] )
  handleClick( event: MouseEvent ) {
    if ( event.target instanceof HTMLCanvasElement ) {
      return
    }
    if ( event.target instanceof Element ) {
      if ( event.target.id === this.id ) {
        this.isActive = !this.isActive
        this.iconName =
          this.isActive ? this.iconNameEnabled : this.iconNameDisabled
        this.isActiveChange.emit( this.isActive )
        return
      }
    }
    this.isActive = false
  }

  onClick() {}
}
