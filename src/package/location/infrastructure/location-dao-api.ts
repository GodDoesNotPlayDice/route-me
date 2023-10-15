import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { locationToJson } from 'src/package/location/application/location-mapper'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { Location } from 'src/package/location/domain/models/location'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class LocationDaoApi implements LocationDao {

  private url = environment.apiUrl

  constructor( private http: HttpClient ) {}

  /**
   * Create location
   * @throws {ApiOperationException} - if api operation failed
   */
  async create( location: Location ): Promise<Result<boolean, Error>> {
    try {
      const locationJsonResult = locationToJson( location )

      if ( locationJsonResult.isErr() ) {
        return Err( locationJsonResult.unwrapErr() )
      }

      const response = await this.http.post( this.url, locationJsonResult.unwrap() ).toPromise()

      console.log( 'response', response)
      return Ok( true )
    }
    catch ( e ) {
      return Err( new ApiOperationException( 'location create api' ) )
    }
  }

  /**
   * Delete location
   * @throws {UnknownException} - if unknown error
   */
  async delete( id: LocationID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Get all location
   * @throws {UnknownException} - if unknown error
   */
  async getAll(): Promise<Result<Location[], Error[]>> {
    return Err( [new UnknownException()] )
  }

  /**
   * Get by id location
   * @throws {UnknownException} - if unknown error
   */
  async getById( id: LocationID ): Promise<Result<Location, Error[]>> {
    return Err( [new UnknownException()] )
  }

  /**
   * Update location
   * @throws {UnknownException} - if unknown error
   */
  async update( location: Location ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

}
