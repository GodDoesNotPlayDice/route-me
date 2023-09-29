import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { DriversService } from 'src/app/shared/services'
import {
  DriverCardInfo,
} from 'src/app/shared/models'

@Component( {
  standalone : true,
  selector   : 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls  : [ './trip-history.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    DriveCardComponent
  ]
} )
export class TripHistoryPage {

  constructor( private driversService: DriversService ) {
    this.driversService.getDrivers()
        .forEach( ( driver ) => {
          if ( driver.state === 'progress' ) {
            this.progressDrivers.push( driver )
          }
          else if ( driver.state === 'completed' ) {
            this.completedDrivers.push( driver )
          }
        } )
  }

  progressDrivers: DriverCardInfo[]  = []
  completedDrivers: DriverCardInfo[] = []
}
