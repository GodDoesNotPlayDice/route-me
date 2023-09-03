import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar-home',
  templateUrl: './avatar-home.component.html',
  styleUrls: ['./avatar-home.component.scss'],
})
export class AvatarHomeComponent  implements OnInit {

  constructor() { }

  @Input() url! : string
  ngOnInit() {}

}
