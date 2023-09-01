import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-outlined-button',
  templateUrl: './outlined-button.component.html',
  styleUrls: ['./outlined-button.component.scss'],
})
export class OutlinedButtonComponent {
  @Input() contentText: string = '';
  constructor() { }
}
