import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { DriversService } from 'src/app/shared/services/drivers.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'
import { FilterButtonData } from 'src/package/shared/domain/components/filter-button-data'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

@Component( {
  standalone : true,
  selector   : 'app-home',
  templateUrl: './home.page.html',
  styleUrls  : [ './home.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchLauncherComponent,
    FilterButtonComponent,
    DriveCardComponent
  ]
} )
export class HomePage implements OnInit {

  constructor( private driversService: DriversService,
    private trip: TripService )
  {}

  async ngOnInit() {
    // this.info = this.driversService.getDrivers()
    //                 .filter( ( driver ) => {
    //                   return driver.state === TripStateEnum.Open
    //                 } )
    this.loading = true
    const result = await this.trip.getAllByState( TripStateEnum.Open )

    if ( result.length > 0 ) {
      this.info = result.map( ( trip ): DriverCardInfo => {
        return {
          cost             : trip.price.isNone()
            ? 0
            : trip.price.unwrap().amount.value,
          date             : trip.startDate.toLocaleString(),
          state            : trip.state,
          endLocationName  : trip.endLocation.value,
          startLocationName: trip.startLocation.value,
          driverAvatar     : {
            name: trip.driverID.value,
            url : 'https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png'
          },
          passengerUrls    : trip.passengersID.map( ( passenger ) => {
            return passenger.value
          } )
        }
      } )
      this.loading = false
      console.log( 'this.info' )
      console.log( this.info )
    }
    else {
      this.error = true
    }
  }

  info: DriverCardInfo[] = []

  error: boolean   = false
  loading: boolean = false

  protected readonly filterButtonList = filterButtonList
}

const filterButtonList: FilterButtonData[] = [
  {
    name : 'Comunidad',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png'
  },
  {
    name : 'Eventos',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png'
  },
  {
    name : 'Viajes',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png'
  }
]


