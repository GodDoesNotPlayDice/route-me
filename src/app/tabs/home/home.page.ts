import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { DriversService } from 'src/app/services/drivers/drivers.service'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component'
import {
  DriverCardInfo,
  FilterButtonData,
  FilterButtonDataSchema
} from 'src/app/shared/models'

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

  constructor( private driversService: DriversService )
  {
    this.driversService.getDrivers()
        .forEach( ( driver ) => {
          if ( driver.state === 'open' ) {
            this.info.push( driver )
          }
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
  FilterButtonDataSchema.parse( {
    name  : 'Comunidad',
    imagen: 'https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png'
  } ),
  FilterButtonDataSchema.parse( {
    name  : 'Eventos',
    imagen: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png'
  } ),
  FilterButtonDataSchema.parse( {
    name  : 'Viajes',
    imagen: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png'
  } )
]
