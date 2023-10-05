import { Injectable } from '@angular/core'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { newCategoryID } from 'src/package/category/domain/models/category-id'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { newTrip } from 'src/package/trip/domain/models/trip'
import { TripPriceProps } from 'src/app/shared/models/trip-price'
import { ulid } from 'ulidx'

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private tripDao : TripDao ) { }
  async create(props:{
    startLocation: string
    endLocation: string
    startDate: Date,
    endDate: Date
  }): Promise<Result<boolean, string>>{
    const driverID = newDriverID({
      value: ulid()
    })

    const result = await this.tripDao.create(newTrip(
      {
        id: ulid(),
        description: '',
        driverID: driverID,
        passengers: [],
        category: newCategoryID({
          value: ulid()
        }),
        chat: newChatID({
          value: ulid()
        }),
        startDate: props.startDate,
        endDate: props.endDate,
        startLocation: props.startLocation,
        endLocation: props.endLocation
      }
    ))
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( true ) )
  }

}
