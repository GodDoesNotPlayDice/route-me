import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripState } from 'src/app/shared/models/trip-state'
import { tripToJSON } from 'src/package/trip/application/trip-mapper'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from '../domain/models/trip-id'

export class TripDaoApi implements TripDao {

  private url = environment.apiUrl

  constructor( private http: HttpClient ) {}

  async getAllByState( state: TripState ): Promise<Result<Trip[], string>> {
    return Promise.resolve( Err( '' ) )

  }

  async getById( id: TripID ): Promise<Result<Trip, string>> {
    return Promise.resolve( Err( '' ) )
  }

  async delete( id: TripID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( '' ) )
  }

  async update( trip: Trip ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( '' ) )
  }

  async create( trip: Trip ): Promise<Result<boolean, string>> {
    try {
      const j = tripToJSON( trip )
      this.http.post( this.url, j )
          .subscribe( ( data ) => {
            console.log( 'data', data )
          } )

      return Promise.resolve( Ok( true ) )
    }
    catch ( e ) {
      return Promise.resolve( Err( 'err create trip' ) )
    }
  }

  public getAll(): Promise<Result<Trip[], string>> {
    return Promise.resolve( Ok( [] ) )
  }
}
