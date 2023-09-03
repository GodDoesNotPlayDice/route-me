import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-drive-card',
  templateUrl: './drive-card.component.html',
  styleUrls: ['./drive-card.component.scss'],
})
export class DriveCardComponent {

  constructor() { }

  @Input() info! : DriverCardInfo
}

export interface Avatar {
  name: string,
  url: string
}

export interface DriverCardInfo {
  driverAvatar : Avatar,
  cost : number,
  date : Date,
  startLocation : string,
  endLocation : string,
  passengerAvatars : Avatar[]
}
