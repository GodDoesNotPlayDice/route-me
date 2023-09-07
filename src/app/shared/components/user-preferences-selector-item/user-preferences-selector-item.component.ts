import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { PreferenceItem } from 'src/app/shared/components/user-preferences-selector/user-preferences-selector.component'

@Component({
  selector: 'app-user-preferences-selector-item',
  templateUrl: './user-preferences-selector-item.component.html',
  styleUrls: ['./user-preferences-selector-item.component.scss'],
})
export class UserPreferencesSelectorItemComponent {
  @Input() selected : boolean = false
  @Input() item !: PreferenceItem
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>()
  @Output() onDeselected: EventEmitter<string> = new EventEmitter<string>()

  public onSelect( $event: MouseEvent ): void {
    this.selected = !this.selected
    if ( this.selected ) {
      this.onSelected.emit(this.item.name)
    } else {
      this.onDeselected.emit(this.item.name)
    }
  }
}
