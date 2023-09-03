import {Component} from '@angular/core';
import {
  DriverCardInfo
} from "../../shared/components/drive-card/drive-card.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor() {
    if (this.info.length === 0){
      this.error = true
    }
  }

  info : DriverCardInfo[] = driveInfoList

  error : boolean = false
}

const driveInfoList: DriverCardInfo[] = [
  {
    driverAvatar: {
      name: "juan",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50
  },
  {
    driverAvatar: {
      name: "juan",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50
  },
  {
    driverAvatar: {
      name: "mario",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1147603255032041642/5ni93d3zaera1.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50
  }
]
