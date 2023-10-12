import {
  Err,
  Result
} from 'oxide.ts'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { Location } from 'src/package/location/domain/models/location'
import { LocationID } from 'src/package/location/domain/models/location-id'

export class LocationDaoApi implements LocationDao {
  public create( location: Location ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( '' ) )
  }

  public delete( id: LocationID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( '' ) )
  }

  public getAll(): Promise<Result<Location[], string>> {
    return Promise.resolve( Err( '' ) )
  }

  public getById( id: LocationID ): Promise<Result<Location, string>> {
    return Promise.resolve( Err( '' ) )
  }

  public update( location: Location ): Promise<Result<boolean, string>> {
    return Promise.resolve( Err( '' ) )
  }

}
