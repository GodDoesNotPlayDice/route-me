import { CommonModule } from '@angular/common'
import {Component, Input} from '@angular/core';
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AvatarHomeComponent } from 'src/app/shared/components/Avatars/avatar-home/avatar-home.component'
import { DriverCardInfo } from 'src/app/shared/models/DriverCardInfo'

@Component({
  standalone: true,
  selector: 'app-drive-card',
  templateUrl: './drive-card.component.html',
  styleUrls: ['./drive-card.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    AvatarHomeComponent
  ]
})
export class DriveCardComponent {

  constructor(private router : Router) { }

  @Input() info! : DriverCardInfo

  async buttonClick( $event: MouseEvent ){
    $event.preventDefault()
    await this.router.navigate([`/trip-details/`], { state: { ...this.info } })
  }
}


