import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {PreferenceItem} from "../../models/PreferenceItem";

@Component({
  standalone: true,
  selector: 'app-user-preferences-selector-item',
  templateUrl: './user-preferences-selector-item.component.html',
  styleUrls: ['./user-preferences-selector-item.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
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
