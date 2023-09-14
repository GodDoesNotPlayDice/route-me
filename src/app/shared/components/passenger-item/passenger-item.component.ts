import {
  Component,
  Input
} from '@angular/core'

@Component({
  selector: 'app-passenger-item',
  templateUrl: './passenger-item.component.html',
  styleUrls: ['./passenger-item.component.scss'],
})
export class PassengerItemComponent {
  @Input() userName : string = 'Juanito'
  @Input() userUrlImage : string = 'https://media.discordapp.net/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png?width=416&height=445'
}
