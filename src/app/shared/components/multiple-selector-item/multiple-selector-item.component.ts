import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { MultipleSelectorData } from 'src/app/shared/models/multiple-selector-data'

@Component( {
  standalone : true,
  selector   : 'app-multiple-selector-item',
  templateUrl: './multiple-selector-item.component.html',
  styleUrls  : [ './multiple-selector-item.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class MultipleSelectorItemComponent {
  @Input() selected: boolean                   = false
  @Input({required: true}) item : MultipleSelectorData
  @Output() onSelected: EventEmitter<string>   = new EventEmitter<string>()
  @Output() onDeselected: EventEmitter<string> = new EventEmitter<string>()

  public onSelect( $event: MouseEvent ): void {
    this.selected = !this.selected
    if ( this.selected ) {
      this.onSelected.emit( this.item.name )
    }
    else {
      this.onDeselected.emit( this.item.name )
    }
  }
}
