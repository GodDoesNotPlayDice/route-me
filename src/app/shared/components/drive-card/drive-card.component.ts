import {Component, Input} from '@angular/core';
import { Router } from '@angular/router'
import { DriverCardInfo } from 'src/app/shared/models/DriverCardInfo'

@Component({
  selector: 'app-drive-card',
  templateUrl: './drive-card.component.html',
  styleUrls: ['./drive-card.component.scss'],
})
export class DriveCardComponent {

  constructor(private router : Router) { }

  @Input() info! : DriverCardInfo

  async buttonClick( $event: MouseEvent ){
    $event.preventDefault()
    await this.router.navigate([`/trip-details/`], { state: { ...this.info } })
  }
}


