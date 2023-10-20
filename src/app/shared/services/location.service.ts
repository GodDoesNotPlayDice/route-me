import { Injectable } from '@angular/core'
import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { createLocation } from 'src/package/location/application/create-location'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { Location } from 'src/package/location/domain/models/location'
import { Position } from 'src/package/position-api/domain/models/position'

@Injectable( {
  providedIn: 'root'
} )
export class LocationService {

  constructor( private locationDao: LocationDao ) { }

  async createLocation( props: {
    name: string,
    countryCode: string,
    position: Position
  } ): Promise<Option<Location>> {
    const result = await createLocation( this.locationDao, props )

    if ( result.isErr() ) {
      return None
    }
    return Some( result.unwrap() )
  }
}
