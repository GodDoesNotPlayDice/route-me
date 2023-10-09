import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Position } from 'src/package/location-api/domain/models/position'
import { streetFromJson } from 'src/package/street-api/application/street-mapper'
import { Street } from 'src/package/street-api/domain/models/street'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'

export class StreetMapBox implements StreetRepository{
  constructor( private http: HttpClient ) {}

  async getStreet( searchTerm: string,
    center: Position ): Promise<Result<Street, string>> {

    const response = await this.http.get( `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?proximity=${center.lng},${center.lat}&access_token=${environment.mapBoxApiKey}`).toPromise()

    if ( response === undefined ) {
      return Promise.resolve( Err( 'error street map box' ) )
    }

    const streetResult = streetFromJson( response )

    if ( streetResult.isErr() ) {
      return Promise.resolve( Err( streetResult.unwrapErr() ) )
    }

    return Promise.resolve( Ok(streetResult.unwrap()) )
  }
}
