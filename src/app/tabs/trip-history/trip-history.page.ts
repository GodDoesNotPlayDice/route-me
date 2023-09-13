import { Component } from '@angular/core';
import { DriversService } from 'src/app/services/drivers/drivers.service'
import { DriverCardInfo } from 'src/app/shared/models/DriverCardInfo'

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage {

  constructor(private driversService : DriversService) {
    this.driversService.getDrivers().forEach((driver) => {
      if ( driver.state === 'progress' ){
        this.progressDrivers.push(driver)
      }
      else if ( driver.state === 'completed' ){
        this.completedDrivers.push(driver)
      }
    })
  }

  progressDrivers : DriverCardInfo[] = []
  completedDrivers : DriverCardInfo[] = []
}
