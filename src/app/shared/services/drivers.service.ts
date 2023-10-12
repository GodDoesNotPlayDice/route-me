import { Injectable } from '@angular/core'
import { newAvatar } from 'src/package/shared/domain/components/avatar'
import {
  DriverCardInfo,
  newDriverCardInfo
} from 'src/package/shared/domain/components/driver-card-info'
import { newTripState } from 'src/package/trip/domain/models/trip-state'
import { newLocation } from 'src/package/location/domain/models/location'
import { ulid } from 'ulidx'

@Injectable( {
  providedIn: 'root'
} )
export class DriversService {

  getDrivers(): DriverCardInfo[] {
    return driveInfoList
  }
}

const driveInfoList: DriverCardInfo[] = [
  newDriverCardInfo( {
    driverAvatar    : newAvatar( {
      name: 'Juan',
      url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148055951946027070/640px-LinuxCon_Europe_Linus_Torvalds_03_28cropped29.png'
    } ),
    passengerAvatars: [
      newAvatar( {
        name: 'noseve1',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } ),
      newAvatar( {
        name: 'noseve1',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } ),
      newAvatar( {
        name: 'noseve2',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } )
    ],
    startLocation   : newLocation({
      id: ulid(),
      name: 'viña',
      countryCode: 'CL',
      latitude: 0,
      longitude: 0
    }),
    endLocation     : newLocation({
      id: ulid(),
      name: 'santiago',
      countryCode: 'CL',
      latitude: 0,
      longitude: 0
    }),
    date            : new Date(),
    cost            : 50,
    state           : newTripState( {
      value: 'Open'
    } )
  } ),
  newDriverCardInfo( {
    driverAvatar    : newAvatar( {
      name: 'Fernando',
      url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148056114244636783/AOPolaRSwFJEGgQu8V26chPkzDVgwaq7cTXKyglLcp-oAgs900-c-k-c0x00ffffff-no-rj.png'
    } ),
    passengerAvatars: [
      newAvatar( {
        name: 'noseve1',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } ),
      newAvatar( {
        name: 'noseve2',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } )
    ],
    startLocation   : newLocation({
      id: ulid(),
      name: 'viña',
      countryCode: 'CL',
      latitude: 0,
      longitude: 0
    }),
    endLocation     : newLocation({
      id: ulid(),
      name: 'santiago',
      countryCode: 'CL',
      latitude: 0,
      longitude: 0
    }),
    date            : new Date(),
    cost            : 50,
    state           : newTripState( {
      value: 'Completed'
    } )
  } ),
  newDriverCardInfo( {
    driverAvatar    : newAvatar( {
      name: 'Nicolas',
      url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148057504740298782/influencer_9989_2rdz5slp_400x400_oqd2hpij12.png'
    } ),
    passengerAvatars: [
      newAvatar( {
        name: 'noseve1',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } ),
      newAvatar( {
        name: 'noseve2',
        url : 'https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png'
      } )
    ],
    startLocation   : newLocation({
      id: ulid(),
      name: 'viña',
      countryCode: 'CL',
      latitude: 0,
      longitude: 0
    }),
    endLocation     : newLocation({
      id: ulid(),
      name: 'santiago',
      countryCode: 'CL',
      latitude: 0,
      longitude: 0
    }),
    date            : new Date(),
    cost            : 50,
    state           : newTripState( {
      value: 'Progress'
    } )
  } )
]

