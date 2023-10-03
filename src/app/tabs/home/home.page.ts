import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component'
import { DriverCardInfo } from 'src/app/shared/models/driver-card-info'
import {
  FilterButtonData,
  newFilterButtonData
} from 'src/app/shared/models/filter-button-data'
import { DriversService } from 'src/app/shared/services/drivers.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { newCategory } from 'src/package/category/domain/models/category'
import { newCategoryID } from 'src/package/category/domain/models/category-id'
import { newChat } from 'src/package/chat/domain/models/chat'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { newTrip } from 'src/package/trip/domain/models/trip'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

@Component( {
  standalone : true,
  selector   : 'app-home',
  templateUrl: './home.page.html',
  styleUrls  : [ './home.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchBarComponent,
    FilterButtonComponent,
    DriveCardComponent
  ]
} )
export class HomePage {

  constructor( private driversService: DriversService ,
    private tripService : TripService )
  {
    // this.tripService.create({
    //   name: 'Viaje a la playa',
    //   description: 'Viaje a la playa',
    //   paymentMethod: 'Basic',
    //   price: {
    //     amount: 100,
    //     currency: 'USD'
    //   },
    //   seat: 4,
    //   startLocation: 'Calle 1',
    //   endLocation: 'Calle 2'
    // })
    this.info = this.driversService.getDrivers().filter( ( driver ) => {
      return driver.state === TripStateEnum.Open
    } )

    if ( this.info.length === 0 ) {
      this.error = true
    }
  }

  info: DriverCardInfo[] = []

  error: boolean = false

  protected readonly filterButtonList = filterButtonList
}

const filterButtonList: FilterButtonData[] = [
  newFilterButtonData( {
    name  : 'Comunidad',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png'
  } ),
  newFilterButtonData( {
    name  : 'Eventos',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png'
  } ),
  newFilterButtonData( {
    name  : 'Viajes',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png'
  } )
]
