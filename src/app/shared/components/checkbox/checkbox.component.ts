import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {

  @Input() isChecked: boolean = false;
  @Input() contentText : string = "";
  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  onCheckboxChange(): void {
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }
}
