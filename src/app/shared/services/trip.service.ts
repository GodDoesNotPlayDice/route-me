import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChatService } from 'src/app/shared/services/chat.service'
import { LocationService } from 'src/app/shared/services/location.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { Location } from 'src/package/location/domain/models/location'
import { Position } from 'src/package/position-api/domain/models/position'
import { Street } from 'src/package/street-api/domain/models/street'
import { createTrip } from 'src/package/trip/application/create-trip'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { ulid } from 'ulidx'

@Injectable( {
  providedIn: 'root'
} )
export class TripService {
  constructor( private tripDao: TripDao,
    private locationService : LocationService,
    private chatService : ChatService,
    private authService : AuthService
  ) { }

  async create( props: {
    startLocation: Street,
    endLocation: Street,
    startDate: Date
  } ): Promise<boolean> {
    const driver = this.authService.currentDriver

    if ( driver.isNone() ) {
      return false
    }

    const id = newTripID({
      value: ulid()
    })

    if ( id.isErr() ) {
      return false
    }

    const chat = await this.chatService.createChat({
      tripID: id.unwrap()
    })

    if ( chat.isNone() ){
      return false
    }

    const startLocation = await this.locationService.createLocation({
      name: props.startLocation.place.value,
      // countryCode: props.startLocation.,
      countryCode: '',
      position: props.startLocation.center
    })

    if ( startLocation.isNone() ){
      return false
    }

    const endLocation = await this.locationService.createLocation({
      name: props.endLocation.place.value,
      // countryCode: props.endLocation.,
      countryCode: '',
      position: props.endLocation.center
    })

    if ( endLocation.isNone() ){
      return false
    }

    const result = await createTrip( this.tripDao, {
      id: id.unwrap(),
      startDate: props.startDate,
      chatID: chat.unwrap(),
      endLocationID: endLocation.unwrap(),
      startLocationID: startLocation.unwrap(),
      driverID: driver.unwrap().id
    })

    if ( result.isErr() ) {
      return false
    }
    return false
  }
}
