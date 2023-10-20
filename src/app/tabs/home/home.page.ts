import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  IonicModule,
  ViewDidEnter
} from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { DriverService } from 'src/app/shared/services/driver.service'
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
export class HomePage implements ViewDidEnter {

  constructor( private driverService: DriverService,
    private trip: TripService )
  {}

  async ionViewDidEnter(): Promise<void> {
    // const resultDriver = await this.driverService.driverRegister(
    //   2, 'tesla', [ {
    //     id       : '2',
    //     name     : 'Licencia',
    //     reference: 'url'
    //   } ]
    // )
    // if ( resultDriver ){
    //   console.log('driver ok')
    // }
    // else {
    //   console.log('driver fail')
    // }

    this.loading = true
    const result = await this.trip.getAllByState( TripStateEnum.Open )

    if ( result.length > 0 ) {
      this.info    = result.map( ( trip ): DriverCardInfo => {
        return {
          cost             : trip.price.amount.value,
          date             : trip.startDate.toLocaleString(),
          state            : trip.state,
          endLocationName  : trip.endLocation.name.value,
          startLocationName: trip.startLocation.name.value,
          driverAvatar     : {
            name: trip.driver.passenger.name.value,
            url: trip.driver.passenger.image.value
          },
          passengerUrls    : trip.passengers.map( ( passenger ) => {
            return passenger.image.value
          } )
        }
      } )
      this.loading = false
      console.log( 'home page info' )
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


