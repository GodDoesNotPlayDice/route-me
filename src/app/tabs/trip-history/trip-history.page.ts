import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { DriverService } from 'src/app/shared/services/driver.service'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

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

	constructor( private driversService: DriverService ) {
		// this.driversService.getDrivers()
		//     .forEach( ( driver ) => {
		// 	    if ( driver.state === TripStateEnum.Progress ) {
		// 		    this.progressDrivers.push( driver )
		// 	    }
		// 	    else if ( driver.state === TripStateEnum.Completed ) {
		// 		    this.completedDrivers.push( driver )
		// 	    }
		//     } )
	}

	progressDrivers: DriverCardInfo[]  = []
	completedDrivers: DriverCardInfo[] = []
}
