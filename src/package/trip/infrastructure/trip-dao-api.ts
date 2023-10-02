import {
  Err,
  Result
} from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from '../domain/models/trip-id'

export class TripDaoApi implements TripDao {
  constructor( private url: string ) {
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

  async create( trip: Omit<Trip, 'id'> ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( '' ) )
  }
}
