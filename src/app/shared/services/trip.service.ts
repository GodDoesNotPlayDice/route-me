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
import { TripPriceProps } from 'src/package/trip/domain/models/trip-price'
import { ulid } from 'ulidx'

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private tripDao : TripDao ) { }
  async create(props:{
    name: string
    description: string
    paymentMethod: string,
    price: TripPriceProps
    seat: number
    startLocation: string
    endLocation: string
  }): Promise<Result<boolean, string>>{
    const driverID = newDriverID({
      value: ulid()
    })

    const result = await this.tripDao.create(newTrip(
      {
        id: ulid(),
        paymentMethod: props.paymentMethod,
        name: props.name,
        description: props.description,
        state: 'Open',
        price: {
          amount: props.price.amount,
          currency: props.price.currency
        },
        seat: props.seat,
        startLocation: props.startLocation,
        endLocation: props.endLocation,
        startDate: new Date(),
        driverID: driverID,
        passengers: [],
        category: newCategoryID({
          value: ulid()
        }),
        chat: newChatID({
          value: ulid()
        })
      }
    ))
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( true ) )
  }

}
