import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChatService } from 'src/app/shared/services/chat.service'
import { LocationService } from 'src/app/shared/services/location.service'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { Street } from 'src/package/street-api/domain/models/street'
import { createTrip } from 'src/package/trip/application/create-trip'
import { getAllTrips } from 'src/package/trip/application/get-all-trips'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'
import { ulid } from 'ulidx'

@Injectable( {
  providedIn: 'root'
} )
export class TripService {
  constructor( private tripDao: TripDao,
    private locationService: LocationService,
    private chatService: ChatService,
    private authService: AuthService
  )
  { }

  async getAllTrips(): Promise<Trip[]> {
    const result = await getAllTrips( this.tripDao )

    if ( result.isErr() ) {
      console.log( 'error. get all trip service', result.unwrapErr() )
      return []
    }
    return result.unwrap()
  }

  async getAllByState( state: TripState ): Promise<Trip[]> {
    const result = await this.tripDao.getAllByState( state )

    if ( result.isErr() ) {
      console.log( 'error. get all by state trip service', result.unwrapErr() )
      return []
    }
    return result.unwrap()
  }


  async create( props: {
    startLocation: Street,
    endLocation: Street,
    startDate: Date
  } ): Promise<boolean> {
    // const driver = this.authService.currentDriver
    const driver = newDriverID( {
      value: '01F2ZQZJZJZJZJZJZJZJZJZJZJ'
    } )

    // if ( driver.isNone() ) {
    //   return false
    // }

    const id = newTripID( {
      value: ulid()
    } )

    if ( id.isErr() ) {
      return false
    }

    const startLocation = await this.locationService.createLocation( {
      name       : props.startLocation.place.value,
      countryCode: props.startLocation.shortCode.value,
      position   : props.startLocation.center
    } )

    if ( startLocation.isNone() ) {
      return false
    }

    const endLocation = await this.locationService.createLocation( {
      name       : props.endLocation.place.value,
      countryCode: props.endLocation.shortCode.value,
      position   : props.endLocation.center
    } )

    if ( endLocation.isNone() ) {
      return false
    }

    const result = await createTrip( this.tripDao, {
      id           : id.unwrap(),
      startDate    : props.startDate,
      chatID       : chat.unwrap(),
      endLocation  : endLocation.unwrap(),
      startLocation: startLocation.unwrap(),
      driver       : driver.unwrap()
    } )

    if ( result.isErr() ) {
      return false
    }
    return true
  }
}
