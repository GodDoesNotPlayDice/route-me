import {Component, Input} from '@angular/core';

type LabeledIconPositionType = 'row' | 'col'

@Component({
  selector: 'app-labeled-icon',
  templateUrl: './labeled-icon.component.html',
  styleUrls: ['./labeled-icon.component.scss'],
})
export class LabeledIconComponent  {

  constructor() { }

  @Input() position : LabeledIconPositionType = 'row'
  @Input() textLabel : string = ''
  @Input() iconName : string = 'logo-ionic'
}
