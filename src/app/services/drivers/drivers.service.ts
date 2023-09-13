import { Injectable } from '@angular/core';
import { DriverCardInfo } from 'src/app/shared/models/DriverCardInfo'

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  getDrivers() : DriverCardInfo[] {
    return driveInfoList
  }
}

const driveInfoList: DriverCardInfo[] = [
  {
    driverAvatar: {
      name: "Juan",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1148055951946027070/640px-LinuxCon_Europe_Linus_Torvalds_03_28cropped29.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50,
    state: 'open'
  },
  {
    driverAvatar: {
      name: "Fernando",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1148056114244636783/AOPolaRSwFJEGgQu8V26chPkzDVgwaq7cTXKyglLcp-oAgs900-c-k-c0x00ffffff-no-rj.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50,
    state: 'completed'
  },
  {
    driverAvatar: {
      name: "Nicolas",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1148057504740298782/influencer_9989_2rdz5slp_400x400_oqd2hpij12.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50,
    state: 'progress'
  }
]

