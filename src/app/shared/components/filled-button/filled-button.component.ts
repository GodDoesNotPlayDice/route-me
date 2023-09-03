import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filled-button',
  templateUrl: './filled-button.component.html',
  styleUrls: ['./filled-button.component.scss'],
})
export class FilledButtonComponent  implements OnInit {
  @Input() contentText: string = '';
  constructor() { }

  ngOnInit() {}

}
