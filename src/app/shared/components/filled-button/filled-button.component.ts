import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  selector: 'app-filled-button',
  templateUrl: './filled-button.component.html',
  styleUrls: ['./filled-button.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class FilledButtonComponent {
  @Input() contentText: string = '';
  @Input() blocked: boolean = false;
  @Output() onClick = new EventEmitter<void>()
  public clicked( $event: MouseEvent ): void {
    this.onClick.emit()
  }
}
