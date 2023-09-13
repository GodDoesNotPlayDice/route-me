import {Component} from '@angular/core';
import { DriversService } from 'src/app/services/drivers/drivers.service'
import { DriverCardInfo } from 'src/app/shared/models/DriverCardInfo'
import { FilterButtonData } from 'src/app/shared/models/FilterButtonData'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private driversService : DriversService) {
    this.driversService.getDrivers().forEach((driver) => {
      if ( driver.state === 'open' ){
        this.info.push(driver)
      }
    })

    if (this.info.length === 0){
      this.error = true
    }
  }

  info : DriverCardInfo[] = []

  error : boolean = false
  protected readonly filterButtonList = filterButtonList;
}

const filterButtonList : FilterButtonData[] = [{
  name: "Comunidad",
  imagen: "https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png"
},
{
  name: "Eventos",
  imagen: "https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png"
},
{
  name: "Viajes",
  imagen: "https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png"
}]
