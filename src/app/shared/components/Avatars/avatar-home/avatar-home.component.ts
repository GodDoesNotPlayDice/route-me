import { CommonModule } from '@angular/common'
import {Component, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  selector: 'app-avatar-home',
  templateUrl: './avatar-home.component.html',
  styleUrls: ['./avatar-home.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class AvatarHomeComponent {
  @Input({required: true}) url! : string
}
