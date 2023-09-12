import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'

@Component({
  selector: 'app-filled-button',
  templateUrl: './filled-button.component.html',
  styleUrls: ['./filled-button.component.scss'],
})
export class FilledButtonComponent {
  @Input() contentText: string = '';
  @Input() blocked: boolean = false;
  @Output() onClick = new EventEmitter<void>()
  public clicked( $event: MouseEvent ): void {
    this.onClick.emit()
  }
}
