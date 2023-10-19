import { Injectable } from '@angular/core'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'

@Injectable( {
  providedIn: 'root'
} )
export class DriversService {

  getDrivers(): DriverCardInfo[] {
    return driveInfoList
  }
}

const driveInfoList: DriverCardInfo[] = [
  {
    driverAvatar     : {
      name: 'Juan',
      url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148055951946027070/640px-LinuxCon_Europe_Linus_Torvalds_03_28cropped29.png'
    },
    passengerUrls    : [
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png',
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png',
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
    ],
    startLocationName: 'viña',
    endLocationName  : 'santiago',
    date             : new Date().toLocaleString(),
    cost             : 50,
    state            : 'Open'
  },
  {
    driverAvatar     : {
      name: 'Fernando',
      url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148056114244636783/AOPolaRSwFJEGgQu8V26chPkzDVgwaq7cTXKyglLcp-oAgs900-c-k-c0x00ffffff-no-rj.png'
    },
    passengerUrls    : [
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png',
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
    ],
    startLocationName: 'viña',
    endLocationName  : 'santiago',
    date             : new Date().toLocaleString(),
    cost             : 50,
    state            : 'Completed'
  },
  {
    driverAvatar     : {
      name: 'Nicolas',
      url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148057504740298782/influencer_9989_2rdz5slp_400x400_oqd2hpij12.png'
    },
    passengerUrls    : [
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png',
      'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
    ],
    startLocationName: 'viña',
    endLocationName  : 'santiago',
    date             : new Date().toLocaleString(),
    cost             : 50,
    state            : 'Progress'
  }
]

