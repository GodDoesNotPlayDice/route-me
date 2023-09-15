import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class GoogleMapComponent {
}
