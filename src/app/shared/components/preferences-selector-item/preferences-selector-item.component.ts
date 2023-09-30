import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { PreferenceItem } from 'src/app/shared/models/preference-item'

@Component( {
  standalone : true,
  selector   : 'app-user-preferences-selector-item',
  templateUrl: './preferences-selector-item.component.html',
  styleUrls  : [ './preferences-selector-item.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule
  ]
} )
export class PreferencesSelectorItemComponent {
  @Input() selected: boolean                   = false
  @Input({required: true}) item : PreferenceItem
  @Output() onSelected: EventEmitter<string>   = new EventEmitter<string>()
  @Output() onDeselected: EventEmitter<string> = new EventEmitter<string>()

  public onSelect( $event: MouseEvent ): void {
    this.selected = !this.selected
    if ( this.selected ) {
      this.onSelected.emit( this.item.name.value )
    }
    else {
      this.onDeselected.emit( this.item.name.value )
    }
  }
}
