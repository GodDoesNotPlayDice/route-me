import { Injectable } from '@angular/core'
import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { AuthService } from 'src/app/shared/services/auth.service'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverDocumentDao } from 'src/package/driver-document/domain/dao/driver-document-dao'
import { createDriver } from 'src/package/driver/application/create-driver'
import { getDriver } from 'src/package/driver/application/get-driver'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverCardInfo } from 'src/package/shared/domain/components/driver-card-info'
import { newEmail } from 'src/package/shared/domain/models/email'

@Injectable( {
  providedIn: 'root'
} )
export class DriverService {

  constructor(
    private driverDao : DriverDao,
    private authService : AuthService,
    // private driverCarDao : DriverCarDao,
    // private driverDocumentDao : DriverDocumentDao
  ) {}

  getDrivers(): DriverCardInfo[] {
    return driveInfoList
  }

  async getDriver(): Promise<Option<Driver>> {
    // if ( this.authService.currentUser.isNone() ){
    //   return None
    // }
    //TODO: driver email fijo
    const email = newEmail({ value: 'u@go.co' })

    if ( email.isErr() ){
      console.log('email fijo fail')
      return None
    }

    const result = await getDriver(this.driverDao, email.unwrap())

    if ( result.isErr() ){
      console.log(result.unwrapErr())
      console.log('get driver fail')
      return None
    }
    return Some(result.unwrap())
  }

  async driverRegister(
    seat: number,
    model: string,
    documents: {
      id: string,
      name: string,
      reference: string
    }[]
  ): Promise<boolean> {

    if ( this.authService.currentPassenger.isNone() ){
      return false
    }

    const result = await createDriver(this.driverDao ,{
      seat: seat,
      model: model,
      documents: documents,
      passenger: this.authService.currentPassenger.unwrap()
    })

    if ( result.isErr() ){
      console.log( 'driver register error' )
      return false
    }

    //TODO: mejor en auth?
    this.authService.currentDriver = Some(result.unwrap())
    return true
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

