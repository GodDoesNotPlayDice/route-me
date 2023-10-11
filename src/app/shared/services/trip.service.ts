import { Injectable } from '@angular/core'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { newCategory } from 'src/package/category/domain/models/category'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { Position } from 'src/package/location-api/domain/models/position'
import { newLocation } from 'src/package/shared/domain/models/location/location'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { newTrip } from 'src/package/trip/domain/models/trip'
import { ulid } from 'ulidx'

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private tripDao : TripDao ) { }
  async create(props:{
    startPosition: Position,
    endPosition: Position,
    startName: string,
    endName: string,
    startDate: Date
    //TODO: calcular end date por default a 2 semanas despues
    // endDate: Date
  }): Promise<Result<boolean, string>>{
    const driverID = newDriverID({
      value: ulid()
    })

    const category = newCategory({
      id: ulid() ,
      name: 'default'
    })

    const startLoc = newLocation({
      id: ulid(),
      name: 'default',
      latitude: 0,
      longitude: 0
    })

    const endLoc = newLocation({
      id: ulid(),
      name: 'default',
      latitude: 0,
      longitude: 0
    })

    const result = await this.tripDao.create(newTrip(
      {
        id: ulid(),
        description: '',
        driverID       : driverID,
        passengers     : [],
        category       : category.id,
        chat           : newChatID({
          value: ulid()
        }),
        startDate      : props.startDate,
        endDate        : props.startDate,
        startLocationID: startLoc.id,
        endLocationID: endLoc.id
      }
    ))
    if ( result.isErr() ) {
      return Promise.resolve( Err( result.unwrapErr() ) )
    }
    return Promise.resolve( Ok( true ) )
  }
}
